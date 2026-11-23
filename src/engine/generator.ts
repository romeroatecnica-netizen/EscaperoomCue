import {formatTemplate, type TranslationDictionary} from '../i18n';
import type {
  ColorSymbolDialSpec,
  ColorToken,
  DifficultyId,
  EscapeMission,
  HidingSpot,
  PatternTile,
  PuzzleStation,
  PuzzleType,
  ShapeToken,
  SpaceId,
  ThemeId,
} from '../types/escape';
import {SPACES} from './spaces';

const COLORS: ColorToken[] = ['indigo', 'emerald', 'amber', 'rose', 'sky'];
const SHAPES: ShapeToken[] = ['circle', 'triangle', 'square', 'star', 'diamond'];
const CIPHER_GLYPHS = ['▲', '◆', '★', '●', '■', '✦', '⬢', '◈', '⬟', '❖'];

function createRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleWithRng<T>(arr: readonly T[], rng: () => number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function normalizeAnswer(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, '');
}

export function buildSinglePuzzle(
  type: PuzzleType,
  order: number,
  spot: HidingSpot,
  difficulty: DifficultyId,
  seedOffset: number,
  t: TranslationDictionary,
): PuzzleStation {
  const rng = createRng(seedOffset + order * 977);
  const roomName = t.roomsAndSpots[spot.roomLabelKey] ?? spot.roomLabelKey;
  const spotName = t.roomsAndSpots[spot.labelKey] ?? spot.labelKey;
  const setupNote = `${roomName} → ${spotName}`;

  if (type === 'color_symbol_lock') {
    const dialCount = difficulty === 'easy' ? 3 : 4;
    const pickedColors = shuffleWithRng(COLORS, rng).slice(0, dialCount);
    const pickedShapes = shuffleWithRng(SHAPES, rng).slice(0, dialCount);
    const sequence: ColorSymbolDialSpec[] = pickedColors.map((color, idx) => ({
      color,
      shape: pickedShapes[idx],
    }));

    const clues: string[] = [
      formatTemplate(t.puzzleTemplates.colorLock.clueFirst, {
        color: t.station.colorLabels[sequence[0].color],
        shape: t.station.shapeLabels[sequence[0].shape],
      }),
    ];
    for (let i = 1; i < sequence.length - 1; i++) {
      clues.push(
        formatTemplate(t.puzzleTemplates.colorLock.clueMiddle, {
          pos: i + 1,
          prevColor: t.station.colorLabels[sequence[i - 1].color],
          color: t.station.colorLabels[sequence[i].color],
          shape: t.station.shapeLabels[sequence[i].shape],
        }),
      );
    }
    clues.push(
      formatTemplate(t.puzzleTemplates.colorLock.clueLast, {
        color: t.station.colorLabels[sequence[sequence.length - 1].color],
        shape: t.station.shapeLabels[sequence[sequence.length - 1].shape],
      }),
    );
    if (difficulty !== 'easy') {
      clues.push(t.puzzleTemplates.colorLock.clueNoRepeat);
    }

    const solution = sequence.map((s) => `${s.color}:${s.shape}`).join('|');
    const preview = sequence.map((s) => t.station.colorLabels[s.color]).join(' - ');

    return {
      id: `st_${order}_${seedOffset}`,
      order,
      type,
      title: t.puzzleTemplates.colorLock.title,
      storySnippet: t.puzzleTemplates.colorLock.story,
      prompt: t.puzzleTemplates.colorLock.prompt,
      spotId: spot.id,
      physicalSetupNote: setupNote,
      solution,
      hint1: t.puzzleTemplates.colorLock.hint1,
      hint2: formatTemplate(t.puzzleTemplates.colorLock.hint2, {preview}),
      solutionExplanation: formatTemplate(t.puzzleTemplates.colorLock.explain, {code: preview}),
      visual: {kind: 'color_symbol_lock', sequence, ruleClues: clues},
      solved: false,
      revealedHints: 0,
    };
  }

  if (type === 'visual_cipher') {
    const glyphs = shuffleWithRng(CIPHER_GLYPHS, rng);
    const useWord = difficulty !== 'easy';

    if (!useWord) {
      const digits = ['2', '4', '6', '8', '1', '3', '5', '7'];
      const pickedDigits = shuffleWithRng(digits, rng).slice(0, 6);
      const keyTable = pickedDigits.map((digit, idx) => ({
        symbol: glyphs[idx],
        letter: digit,
        digit,
      }));
      const codePairs = [keyTable[0], keyTable[2], keyTable[4]];
      const solution = codePairs.map((p) => p.digit).join('');
      return {
        id: `st_${order}_${seedOffset}`,
        order,
        type,
        title: t.puzzleTemplates.visualCipher.title,
        storySnippet: t.puzzleTemplates.visualCipher.story,
        prompt: t.puzzleTemplates.visualCipher.promptDigits,
        spotId: spot.id,
        physicalSetupNote: setupNote,
        solution,
        hint1: t.puzzleTemplates.visualCipher.hint1,
        hint2: formatTemplate(t.puzzleTemplates.visualCipher.hint2, {prefix: solution.slice(0, 2)}),
        solutionExplanation: formatTemplate(t.puzzleTemplates.visualCipher.explain, {code: solution}),
        visual: {
          kind: 'visual_cipher',
          keyTable,
          encodedTokens: codePairs.map((p) => p.symbol),
          inputMode: 'digits',
        },
        solved: false,
        revealedHints: 0,
      };
    }

    const pool =
      difficulty === 'medium'
        ? t.puzzleTemplates.visualCipher.wordsMedium
        : t.puzzleTemplates.visualCipher.wordsHard;
    const word = pool[Math.floor(rng() * pool.length)].toUpperCase();
    const uniqueLetters = Array.from(new Set(word.split('')));
    const alphabetFiller = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
      .split('')
      .filter((ch) => !uniqueLetters.includes(ch));
    const tableLetters = shuffleWithRng(
      [...uniqueLetters, ...alphabetFiller.slice(0, Math.max(2, 8 - uniqueLetters.length))],
      rng,
    );
    const keyTable = tableLetters.map((letter, idx) => ({
      symbol: glyphs[idx % glyphs.length],
      letter,
      digit: String((idx + 1) % 10),
    }));
    const encodedTokens = word
      .split('')
      .map((ch) => keyTable.find((k) => k.letter === ch)?.symbol ?? '★');

    return {
      id: `st_${order}_${seedOffset}`,
      order,
      type,
      title: t.puzzleTemplates.visualCipher.title,
      storySnippet: t.puzzleTemplates.visualCipher.story,
      prompt: t.puzzleTemplates.visualCipher.promptWord,
      spotId: spot.id,
      physicalSetupNote: setupNote,
      solution: word,
      hint1: t.puzzleTemplates.visualCipher.hint1,
      hint2: formatTemplate(t.puzzleTemplates.visualCipher.hint2, {prefix: word.slice(0, 2)}),
      solutionExplanation: formatTemplate(t.puzzleTemplates.visualCipher.explain, {code: word}),
      visual: {
        kind: 'visual_cipher',
        keyTable,
        encodedTokens,
        inputMode: 'word',
      },
      solved: false,
      revealedHints: 0,
    };
  }

  if (type === 'number_balance') {
    const valA = difficulty === 'easy' ? 2 + Math.floor(rng() * 4) : 4 + Math.floor(rng() * 6);
    const valB = difficulty === 'easy' ? 3 + Math.floor(rng() * 4) : 5 + Math.floor(rng() * 7);
    const step = difficulty === 'easy' ? 2 + Math.floor(rng() * 3) : 4 + Math.floor(rng() * 5);
    const base = valA + valB;
    const seq = [base, base + step, base + step * 2, base + step * 3];
    const targetAnswer = difficulty === 'hard' ? seq[3] + valA : seq[3];
    const solution = String(targetAnswer);

    return {
      id: `st_${order}_${seedOffset}`,
      order,
      type,
      title: t.puzzleTemplates.numberBalance.title,
      storySnippet: t.puzzleTemplates.numberBalance.story,
      prompt: t.puzzleTemplates.numberBalance.prompt,
      spotId: spot.id,
      physicalSetupNote: setupNote,
      solution,
      hint1: t.puzzleTemplates.numberBalance.hint1,
      hint2: formatTemplate(t.puzzleTemplates.numberBalance.hint2, {near: targetAnswer - 1}),
      solutionExplanation: formatTemplate(t.puzzleTemplates.numberBalance.explain, {code: solution}),
      visual: {
        kind: 'number_balance',
        rows: [
          {left: [{icon: 'circle', color: 'indigo', count: 2}], rightValue: valA * 2},
          {
            left: [
              {icon: 'circle', color: 'indigo', count: 1},
              {icon: 'triangle', color: 'emerald', count: 1},
            ],
            rightValue: valA + valB,
          },
          {
            left:
              difficulty === 'hard'
                ? [
                    {icon: 'circle', color: 'indigo', count: 1},
                    {icon: 'triangle', color: 'emerald', count: 1},
                    {icon: 'star', color: 'amber', count: 1},
                  ]
                : [{icon: 'triangle', color: 'emerald', count: 2}],
            rightValue: difficulty === 'hard' ? '?' : valB * 2,
          },
        ],
        sequenceNumbers: [seq[0], seq[1], seq[2], '?'],
        equationHint:
          difficulty === 'hard'
            ? `★ = ${seq[3]} − ${valA} = ${seq[3] - valA} → ? = (${valA} + ${valB} + ${seq[3] - valA})`
            : `+${step}`,
      },
      solved: false,
      revealedHints: 0,
    };
  }

  if (type === 'floorplan_search') {
    const codeLen = difficulty === 'easy' ? 3 : 4;
    let code = '';
    for (let i = 0; i < codeLen; i++) {
      code += String(1 + Math.floor(rng() * 8));
    }
    const directionClues = [
      formatTemplate(t.puzzleTemplates.floorplanSearch.clueRoom, {room: roomName}),
      formatTemplate(t.puzzleTemplates.floorplanSearch.clueSpot, {spot: spotName}),
      formatTemplate(t.puzzleTemplates.floorplanSearch.clueCount, {len: codeLen}),
    ];

    return {
      id: `st_${order}_${seedOffset}`,
      order,
      type,
      title: t.puzzleTemplates.floorplanSearch.title,
      storySnippet: t.puzzleTemplates.floorplanSearch.story,
      prompt: t.puzzleTemplates.floorplanSearch.prompt,
      spotId: spot.id,
      physicalSetupNote: `${setupNote} (${code})`,
      solution: code,
      hint1: formatTemplate(t.puzzleTemplates.floorplanSearch.hint1, {room: roomName}),
      hint2: formatTemplate(t.puzzleTemplates.floorplanSearch.hint2, {
        spot: spotName,
        prefix: code.slice(0, 2),
      }),
      solutionExplanation: formatTemplate(t.puzzleTemplates.floorplanSearch.explain, {
        room: roomName,
        spot: spotName,
        code,
      }),
      visual: {
        kind: 'floorplan_search',
        targetSpotId: spot.id,
        targetRoomKey: spot.roomLabelKey,
        targetSpotKey: spot.labelKey,
        directionClues,
        codeLength: codeLen,
      },
      solved: false,
      revealedHints: 0,
    };
  }

  if (type === 'chronology_order') {
    const scenarios = t.puzzleTemplates.chronologyOrder.scenarios;
    const chosen = scenarios[Math.floor(rng() * scenarios.length)];
    const icons: ('key' | 'map' | 'clock' | 'compass')[] = ['key', 'map', 'clock', 'compass'];
    const orderedSteps = chosen.steps.map((label, idx) => ({
      id: `step_${idx + 1}`,
      label,
      orderIndex: idx + 1,
      icon: icons[idx],
    }));
    const shuffledSteps = shuffleWithRng(orderedSteps, rng);
    const expectedOrderIds = orderedSteps.map((s) => s.id);

    return {
      id: `st_${order}_${seedOffset}`,
      order,
      type,
      title: t.puzzleTemplates.chronologyOrder.title,
      storySnippet: t.puzzleTemplates.chronologyOrder.story,
      prompt: t.puzzleTemplates.chronologyOrder.prompt,
      spotId: spot.id,
      physicalSetupNote: setupNote,
      solution: expectedOrderIds.join('>'),
      hint1: t.puzzleTemplates.chronologyOrder.hint1,
      hint2: formatTemplate(t.puzzleTemplates.chronologyOrder.hint2, {
        first: orderedSteps[0].label,
        second: orderedSteps[1].label,
      }),
      solutionExplanation: t.puzzleTemplates.chronologyOrder.explain,
      visual: {
        kind: 'chronology_order',
        steps: shuffledSteps,
        expectedOrderIds,
      },
      solved: false,
      revealedHints: 0,
    };
  }

  if (type === 'deduction_grid') {
    const evenCandidates = [2, 4, 6];
    const d1 = evenCandidates[Math.floor(rng() * evenCandidates.length)];
    const d2 = 7 + Math.floor(rng() * 3); // 7..9
    const d3 = 1 + Math.floor(rng() * 3); // 1..3 (so d2 > d3)
    const solution = `${d1}${d2}${d3}`;
    const [item1, item2, item3] = t.puzzleTemplates.deductionGrid.items;

    return {
      id: `st_${order}_${seedOffset}`,
      order,
      type,
      title: t.puzzleTemplates.deductionGrid.title,
      storySnippet: t.puzzleTemplates.deductionGrid.story,
      prompt: t.puzzleTemplates.deductionGrid.prompt,
      spotId: spot.id,
      physicalSetupNote: setupNote,
      solution,
      hint1: t.puzzleTemplates.deductionGrid.hint1,
      hint2: formatTemplate(t.puzzleTemplates.deductionGrid.hint2, {
        firstDigit: d1,
        lastDigit: d3,
      }),
      solutionExplanation: formatTemplate(t.puzzleTemplates.deductionGrid.explain, {code: solution}),
      visual: {
        kind: 'deduction_grid',
        rows: [
          {
            subject: item1,
            clue: formatTemplate(t.puzzleTemplates.deductionGrid.clueEven, {limit: d1 + 2}),
            digit: String(d1),
          },
          {
            subject: item2,
            clue: formatTemplate(t.puzzleTemplates.deductionGrid.clueNotFirst, {item: item2, d: d2}),
            digit: String(d2),
          },
          {
            subject: item3,
            clue: formatTemplate(t.puzzleTemplates.deductionGrid.clueGreater, {
              itemA: item2,
              itemB: item3,
            }) + ` (${d3})`,
            digit: String(d3),
          },
        ],
        finalQuestion: t.puzzleTemplates.deductionGrid.finalQuestion,
      },
      solved: false,
      revealedHints: 0,
    };
  }

  // pattern_odd_one
  const useDotsRule = rng() > 0.45;
  const oddTileIndex = Math.floor(rng() * 6);
  const baseShape = SHAPES[Math.floor(rng() * SHAPES.length)];
  const oddShape = SHAPES.find((s) => s !== baseShape) ?? 'star';
  const baseDots = 2 + Math.floor(rng() * 3);
  const oddDots = baseDots === 4 ? 1 : baseDots + 2;

  const tiles: PatternTile[] = Array.from({length: 6}, (_, idx) => {
    const isOddOne = idx === oddTileIndex;
    const color = COLORS[idx % COLORS.length];
    return {
      id: idx,
      shape: useDotsRule ? SHAPES[idx % SHAPES.length] : isOddOne ? oddShape : baseShape,
      color,
      dots: useDotsRule ? (isOddOne ? oddDots : baseDots) : (idx % 3) + 1,
      isOddOne,
    };
  });

  const solution = String(oddTileIndex + 1);
  return {
    id: `st_${order}_${seedOffset}`,
    order,
    type: 'pattern_odd_one',
    title: t.puzzleTemplates.patternOddOne.title,
    storySnippet: t.puzzleTemplates.patternOddOne.story,
    prompt: t.puzzleTemplates.patternOddOne.prompt,
    spotId: spot.id,
    physicalSetupNote: setupNote,
    solution,
    hint1: t.puzzleTemplates.patternOddOne.hint1,
    hint2: formatTemplate(t.puzzleTemplates.patternOddOne.hint2, {rowHint: oddTileIndex + 1}),
    solutionExplanation: formatTemplate(t.puzzleTemplates.patternOddOne.explain, {
      tileNum: oddTileIndex + 1,
    }),
    visual: {
      kind: 'pattern_odd_one',
      tiles,
      oddTileIndex,
      ruleLabel: useDotsRule
        ? t.puzzleTemplates.patternOddOne.ruleDots
        : t.puzzleTemplates.patternOddOne.ruleShape,
    },
    solved: false,
    revealedHints: 0,
  };
}

export function generateEscapeMission(
  spaceId: SpaceId,
  difficulty: DifficultyId,
  themeId: ThemeId,
  seed: number,
  t: TranslationDictionary,
): EscapeMission {
  const space = SPACES[spaceId];
  const rng = createRng(seed);

  const stationCount = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 5 : 6;
  const durationMinutes = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 45 : 60;

  const allPuzzleTypes: PuzzleType[] =
    difficulty === 'easy'
      ? ['color_symbol_lock', 'floorplan_search', 'pattern_odd_one', 'visual_cipher', 'chronology_order']
      : [
          'color_symbol_lock',
          'visual_cipher',
          'number_balance',
          'floorplan_search',
          'chronology_order',
          'deduction_grid',
          'pattern_odd_one',
        ];

  const chosenTypes = shuffleWithRng(allPuzzleTypes, rng).slice(0, stationCount);
  const chosenSpots = shuffleWithRng(space.hidingSpots, rng).slice(0, stationCount);

  const stations: PuzzleStation[] = chosenTypes.map((type, idx) =>
    buildSinglePuzzle(type, idx + 1, chosenSpots[idx], difficulty, seed + idx * 131, t),
  );

  const theme = t.themes[themeId];
  const spaceLabel = t.spaces[spaceId].name;

  return {
    version: 1,
    id: `mission_${spaceId}_${difficulty}_${themeId}_${seed}`,
    title: `${theme.name} · ${spaceLabel}`,
    introStory: theme.intro,
    finaleMessage: theme.finale,
    spaceId,
    difficulty,
    themeId,
    seed,
    durationMinutes,
    createdAt: new Date().toISOString(),
    stations,
    activeStationIndex: 0,
    elapsedSeconds: 0,
    timerRunning: false,
    bonusChallenge: difficulty === 'hard' ? theme.bonus : undefined,
  };
}
