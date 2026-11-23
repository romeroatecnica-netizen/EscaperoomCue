import type {DifficultyId, PuzzleType, SpaceId, ThemeId} from '../types/escape';

export interface FaqItem {
  q: string;
  a: string;
}

export interface AffiliateGearItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  url: string;
}

export interface TranslationDictionary {
  brand: string;
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    appCategory: string;
  };
  nav: {
    generator: string;
    floorplan: string;
    printKit: string;
    guide: string;
    newMission: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    privacyBanner: string;
  };
  controls: {
    spaceLabel: string;
    difficultyLabel: string;
    themeLabel: string;
    seedLabel: string;
    regenerate: string;
    viewModeLabel: string;
    gmView: string;
    playerView: string;
    soundOn: string;
    soundOff: string;
    timerStart: string;
    timerPause: string;
    timerReset: string;
    targetDuration: string;
    minutesUnit: string;
    exportJson: string;
    importJson: string;
    saveSetup: string;
    savedList: string;
    printPhysicalKit: string;
    addStation: string;
    importSuccess: string;
    importError: string;
    saveSuccess: string;
  };
  spaces: Record<SpaceId, {name: string; shortDesc: string}>;
  difficulties: Record<DifficultyId, {name: string; ageHint: string; summary: string}>;
  themes: Record<ThemeId, {name: string; intro: string; finale: string; bonus: string}>;
  roomsAndSpots: Record<string, string>;
  puzzleTypes: Record<PuzzleType, {name: string; badge: string}>;
  station: {
    stationLabel: string;
    ofLabel: string;
    solvedLabel: string;
    lockedLabel: string;
    activeLabel: string;
    hidingSpotLabel: string;
    gmNoteLabel: string;
    solutionLabel: string;
    hint1Btn: string;
    hint2Btn: string;
    revealSolutionBtn: string;
    hint1Label: string;
    hint2Label: string;
    explanationLabel: string;
    enterCodePlaceholder: string;
    checkAnswer: string;
    wrongAttempt: string;
    unlockedToast: string;
    editStation: string;
    moveUp: string;
    moveDown: string;
    deleteStation: string;
    regenPuzzle: string;
    nextStation: string;
    missionCompleteTitle: string;
    missionCompleteDesc: string;
    playAgain: string;
    bonusChallengeLabel: string;
    colorLabels: Record<'indigo' | 'emerald' | 'amber' | 'rose' | 'sky', string>;
    shapeLabels: Record<'circle' | 'triangle' | 'square' | 'star' | 'diamond', string>;
    clickTilePrompt: string;
    orderStepsPrompt: string;
    resetOrder: string;
    tapDialsPrompt: string;
  };
  floorplan: {
    titleGm: string;
    titlePlayer: string;
    subtitleGm: string;
    subtitlePlayer: string;
    legendActive: string;
    legendSolved: string;
    legendLocked: string;
    legendSpot: string;
    clickPinHint: string;
    reassignSpot: string;
  };
  editor: {
    modalTitle: string;
    titleField: string;
    spotField: string;
    storyField: string;
    promptField: string;
    setupNoteField: string;
    solutionField: string;
    hint1Field: string;
    hint2Field: string;
    saveChanges: string;
    cancel: string;
  };
  savedModal: {
    title: string;
    empty: string;
    loadBtn: string;
    deleteBtn: string;
    closeBtn: string;
    stationsCount: string;
  };
  printKit: {
    gmSheetTitle: string;
    gmSheetSubtitle: string;
    playerCardsTitle: string;
    playerCardsSubtitle: string;
    cutLineLabel: string;
    placeAtLabel: string;
    codeToEnterLabel: string;
    backToStudio: string;
    printNow: string;
  };
  puzzleTemplates: {
    colorLock: {
      title: string;
      story: string;
      prompt: string;
      clueFirst: string;
      clueLast: string;
      clueMiddle: string;
      clueNoRepeat: string;
      hint1: string;
      hint2: string;
      explain: string;
    };
    visualCipher: {
      title: string;
      story: string;
      promptDigits: string;
      promptWord: string;
      hint1: string;
      hint2: string;
      explain: string;
      wordsEasy: string[];
      wordsMedium: string[];
      wordsHard: string[];
    };
    numberBalance: {
      title: string;
      story: string;
      prompt: string;
      hint1: string;
      hint2: string;
      explain: string;
      ruleLabel: string;
    };
    floorplanSearch: {
      title: string;
      story: string;
      prompt: string;
      clueRoom: string;
      clueSpot: string;
      clueCount: string;
      hint1: string;
      hint2: string;
      explain: string;
    };
    chronologyOrder: {
      title: string;
      story: string;
      prompt: string;
      hint1: string;
      hint2: string;
      explain: string;
      scenarios: {
        steps: [string, string, string, string];
      }[];
    };
    deductionGrid: {
      title: string;
      story: string;
      prompt: string;
      hint1: string;
      hint2: string;
      explain: string;
      items: [string, string, string];
      clueNotFirst: string;
      clueEven: string;
      clueGreater: string;
      finalQuestion: string;
    };
    patternOddOne: {
      title: string;
      story: string;
      prompt: string;
      hint1: string;
      hint2: string;
      explain: string;
      ruleDots: string;
      ruleShape: string;
    };
  };
  monetization: {
    adSlotLabel: string;
    adNotice: string;
    gearHeading: string;
    gearSubheading: string;
    disclosure: string;
    gearItems: AffiliateGearItem[];
  };
  editorial: {
    heading: string;
    subheading: string;
    stepsTitle: string;
    steps: {title: string; body: string}[];
    difficultyGuideTitle: string;
    difficultyRows: {level: string; age: string; mechanics: string; pacing: string}[];
    safeCluesTitle: string;
    safeClues: string[];
    puzzleGuideTitle: string;
    faqTitle: string;
    faqs: FaqItem[];
  };
  footer: {
    privacyStatement: string;
    canonicalNote: string;
    copyright: string;
  };
}
