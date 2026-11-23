import type {TranslationDictionary} from './types';

export const ja: TranslationDictionary = {
  brand: 'EscapeCue',
  seo: {
    title: 'EscapeCue — おうち脱出ゲーム作成ツール・SVG間取り図・パズル生成',
    description:
      '自宅や好きな空間の間取り図SVGを見ながら、家族や子ども向けの脱出ゲームを作成・印刷できる100%ブラウザ完結型ジェネレーター。',
    ogTitle: 'EscapeCue — おうち脱出ゲーム作成＆間取り図ビルダー',
    ogDescription: 'インタラクティブなSVG間取り図、7種類のビジュアル謎解き、印刷用キットで自宅脱出ゲームを数分で準備。',
    appCategory: 'GameApplication',
  },
  nav: {generator: 'GMスタジオ', floorplan: '間取り図', printKit: '印刷キット', guide: 'ガイド', newMission: '新規作成'},
  hero: {
    kicker: 'ゲームマスター用スタジオ · 100% ローカル動作',
    title: 'おうちで楽しめる本格的な脱出ゲームを数分で作成',
    subtitle: '部屋と難易度を選び、SVG間取り図で隠し場所を確認して、印刷用カードを用意できます。',
    privacyBanner:
      '100% client-side escape room generator for home, family, kids, and group play. All missions, floorplans, and saved setups stay locally in your browser.',
  },
  controls: {
    spaceLabel: '場所', difficultyLabel: '難易度', themeLabel: 'テーマ', seedLabel: 'シード', regenerate: '再生成', viewModeLabel: '表示モード', gmView: 'GM（準備者）画面', playerView: 'プレイヤー画面', soundOn: '効果音ON', soundOff: 'ミュート', timerStart: 'タイマー開始', timerPause: '一時停止', timerReset: 'リセット', targetDuration: '目標時間', minutesUnit: '分', exportJson: 'JSON書き出し', importJson: 'JSON読み込み', saveSetup: '保存する', savedList: '保存済み一覧', printPhysicalKit: '印刷キットを開く', addStation: '地点を追加', importSuccess: 'JSONからミッションを読み込みました。', importError: '無効なEscapeCue JSONファイルです。', saveSuccess: 'ブラウザに保存しました。',
  },
  spaces: {
    full_house: {name: 'おうち全体（複数部屋）', shortDesc: 'リビング・キッチン・寝室・玄関'},
    living_room: {name: 'リビング・ダイニング', shortDesc: 'ソファ・テーブル・本棚・ランプ'},
    kitchen: {name: 'キッチン・パントリー', shortDesc: '冷蔵庫・戸棚・タイマー・スパイス棚'},
    bedroom: {name: '子ども部屋・寝室', shortDesc: '机・本棚・クローゼット・おもちゃ箱'},
    garden: {name: '庭・テラス・ベランダ', shortDesc: 'プランター・ベンチ・階段・パーゴラ'},
    other_space: {name: 'その他の場所（教室・オフィス・旅行先）', shortDesc: 'どこでも使える汎用レイアウト'},
  },
  difficulties: {
    easy: {name: 'かんたん', ageHint: 'キッズ向け (6–10歳)', summary: '4地点 · 色や数・わかりやすいヒント'},
    medium: {name: 'ふつう', ageHint: 'ファミリー向け (10歳+)', summary: '5地点 · 記号暗号・天秤・間取り探索'},
    hard: {name: 'むずかしい', ageHint: 'チャレンジ (14歳+)', summary: '6地点 · 連鎖推理・おまけ課題つき'},
  },
  themes: {
    lost_key: {name: '消えたおうちの鍵ミステリー', intro: '映画ナイトの直前に予備の鍵が消えた！部屋を巡って宝箱を開けよう。', finale: '鍵ボックス解除！お菓子と映画ナイトを守りきりました。', bonus: 'ボーナス：マップを見ずに回った部屋を逆順に言ってみよう。'},
    lab_rescue: {name: 'ラボ救出作戦', intro: '泡立つ実験で棚がロックされた。時間内に数式を解読せよ。', finale: '実験室は無事安全になりました！', bonus: 'ボーナス：最後の確認コードを暗記で逆から言ってみよう。'},
    treasure_map: {name: '宝の地図の謎', intro: 'おじいちゃんが家に隠した真鍮のコンパスと宝箱を見つけよう。', finale: 'お宝発見！家族の宝物を手に入れました。', bonus: 'ボーナス：第1地点から宝箱までのルートを15秒で描いてみよう。'},
    space_alert: {name: '宇宙ステーション警報', intro: '各セクターのビーコンが停止。モジュールを再起動しよう。', finale: '全スラスター正常！自動操縦が復旧しました。', bonus: 'ボーナス：最後のコードを声を出さずにジェスチャーで伝えよう。'},
    chronometer_chest: {name: 'クロノメーターの宝箱', intro: '真夜中に止まった懐中時計。隠された歯車と記号を揃えよう。', finale: '振り子が再び動き、宝箱が開きました！', bonus: 'ボーナス：使った数字コードの合計を計算してみよう。'},
  },
  roomsAndSpots: {
    room_living: 'リビング', room_kitchen: 'キッチン', room_bedroom: '寝室・子ども部屋', room_hallway: '玄関ホール', room_dining: 'ダイニング', room_pantry: 'パントリー', room_study: 'デスクコーナー', room_patio: 'テラス', room_lawn: '庭の小道', room_main_hall: 'メインエリア', room_breakout: 'サブ地点',
    spot_sofa: 'ソファのクッションの下', spot_bookshelf: '本棚の本の後ろ', spot_tv: 'テレビ台の引き出し', spot_dining_table: 'ダイニング椅子の裏', spot_lamp: 'フロアランプの足元', spot_fridge: '冷蔵庫マグネットの裏', spot_cupboard: '乾物戸棚の中', spot_stove: 'キッチンタイマーの横', spot_jars: '計量瓶の後ろ', spot_spices: 'スパイス棚の上', spot_desk: '机のペントレイの下', spot_wardrobe: 'クローゼットのコートポケット', spot_chest: 'おもちゃ箱の中', spot_calendar: '壁掛けカレンダーの裏', spot_bed: '枕の角の下', spot_coat_rack: '玄関コート掛けの封筒', spot_planter: '植木鉢の縁の下', spot_bench: 'ガーデンベンチの下', spot_steps: '3段目の石段のそば', spot_pergola: 'パーゴラの梁に吊るす', spot_whiteboard: 'ホワイトボードのトレイ', spot_cabinet: '収納棚の上',
  },
  puzzleTypes: {
    color_symbol_lock: {name: '色と図形のダイヤル錠', badge: 'ビジュアル'},
    visual_cipher: {name: 'シンボル暗号表', badge: '暗号'},
    number_balance: {name: '天秤と数列ロジック', badge: '論理'},
    floorplan_search: {name: '間取り図ガイド探索', badge: '空間'},
    chronology_order: {name: '出来事の並び替え', badge: '順序'},
    deduction_grid: {name: '3ヒント消去法', badge: '推理'},
    pattern_odd_one: {name: '仲間はずれ探し', badge: '観察'},
  },
  station: {
    stationLabel: '地点', ofLabel: '/', solvedLabel: 'クリア', lockedLabel: 'ロック中', activeLabel: '挑戦中', hidingSpotLabel: '隠し場所', gmNoteLabel: 'GM準備メモ', solutionLabel: '正解コード', hint1Btn: 'ヒント1（やさしめ）', hint2Btn: 'ヒント2（はっきり）', revealSolutionBtn: '答えを見る (GM)', hint1Label: 'やさしいヒント', hint2Label: 'わかりやすいヒント', explanationLabel: '解説', enterCodePlaceholder: 'コードを入力', checkAnswer: 'ロック解除', wrongAttempt: 'まだ違うようです。ヒントを確認してみましょう。', unlockedToast: '解除成功！マップの次の地点へ進もう。', editStation: '編集', moveUp: '上へ', moveDown: '下へ', deleteStation: '削除', regenPuzzle: '問題変更', nextStation: '次の地点へ', missionCompleteTitle: 'ミッション達成！', missionCompleteDesc: 'すべての地点をクリアしました！タイムを記録しよう。', playAgain: 'もう一度遊ぶ', bonusChallengeLabel: 'おまけチャレンジ',
    colorLabels: {indigo: 'あい色', emerald: 'みどり', amber: 'きいろ', rose: 'あか', sky: 'みず色'},
    shapeLabels: {circle: 'まる', triangle: 'さんかく', square: 'しかく', star: 'ほし', diamond: 'ひし形'},
    clickTilePrompt: 'ルールに反しているタイルを1つクリック：', orderStepsPrompt: '正しい時間順（1〜4）に4枚のカードをクリック：', resetOrder: '順番をリセット', tapDialsPrompt: '各ダイヤルをタップして色と図形を合わせよう：',
  },
  floorplan: {titleGm: 'インタラクティブ間取り図 — GM設計図', titlePlayer: 'インタラクティブ間取り図 — 探索マップ', subtitleGm: '隠し場所・順番・答えを一覧表示。ピンをクリックして編集できます。', subtitlePlayer: '答えを隠したまま進行状況を表示します。', legendActive: '挑戦中', legendSolved: 'クリア', legendLocked: '未開放', legendSpot: '配置候補', clickPinHint: 'マップ上の番号ピンをクリックしてください。', reassignSpot: 'ここに移動'},
  editor: {modalTitle: '地点をカスタマイズ', titleField: 'タイトル', spotField: '隠し場所', storyField: 'ストーリー', promptField: '問題文', setupNoteField: 'GM設置メモ', solutionField: '正解', hint1Field: 'ヒント1', hint2Field: 'ヒント2', saveChanges: '保存', cancel: 'キャンセル'},
  savedModal: {title: '保存済みの間取り・設定', empty: 'まだ保存されたゲームはありません。', loadBtn: '読み込む', deleteBtn: '削除', closeBtn: '閉じる', stationsCount: '地点'},
  printKit: {gmSheetTitle: 'ゲームマスター準備シート', gmSheetSubtitle: '開始前に各カードを指定の隠し場所へ配置してください。', playerCardsTitle: '印刷用手がかりカード', playerCardsSubtitle: '点線に沿って切り取り、部屋に隠してください。', cutLineLabel: '切り取り線', placeAtLabel: '隠し場所', codeToEnterLabel: '解除コード', backToStudio: 'スタジオに戻る', printNow: '印刷する'},
  puzzleTemplates: {
    colorLock: {title: 'プリズム色ダイヤル錠', story: '色とりどりの図形が封筒を守っている。', prompt: 'ヒントの通りに色と図形を並べてください。', clueFirst: '1番目は {color}（{shape}）。', clueLast: '最後は {color}（{shape}）。', clueMiddle: '{pos}番目は {prevColor} の直後で {color}（{shape}）。', clueNoRepeat: '同じ色は使われません。', hint1: 'まず最初と最後の位置を決めましょう。', hint2: '左からの色順：{preview}。', explain: '条件を当てはめると {code} になります。'},
    visualCipher: {title: 'シンボル暗号表', story: '不思議なマークで書かれたメモが見つかった。', promptDigits: '対応表を使って数字PINを解読しよう。', promptWord: '対応表を使って秘密の単語を入力しよう。', hint1: '左から1文字ずつ表と照らし合わせてください。', hint2: '最初の2文字は {prefix} です。', explain: '対応表から {code} が導けます。', wordsEasy: ['KEY', 'MAP', 'SUN', 'BOX', 'CAT'], wordsMedium: ['LAMP', 'DOOR', 'BOOK', 'STAR', 'CLUE'], wordsHard: ['VAULT', 'CLOCK', 'PRISM', 'SPARK', 'CIPHER']},
    numberBalance: {title: 'てんびんと数列パズル', story: '古い天秤と数字の帯が鍵を塞いでいる。', prompt: '（?）に入る数字を計算しよう。', hint1: '1行目から1つの図形の重さを求めましょう。', hint2: '答えは {near} の近くです。', explain: '順番に計算すると {code} になります。', ruleLabel: 'ルール'},
    floorplanSearch: {title: '間取り図サーチ謎', story: '部屋の中に安全に隠された実物カードを見つけよう。', prompt: 'ヒントの場所を調べ、書かれているコードを入力しよう。', clueRoom: '向かう場所：{room}。', clueSpot: '調べる場所：{spot}。', clueCount: '{len}桁のコードを読み取ろう。', hint1: '間取り図の {room} を確認してください。', hint2: '{spot} をチェック。最初の文字は {prefix}。', explain: '{room} の {spot} に {code} があります。'},
    chronologyOrder: {title: '出来事のタイムライン', story: 'バラバラの4枚のカードを正しい順に並べよう。', prompt: '最初から最後までの正しい順番にカードをクリックしてください。', hint1: '扉を開ける前の最初の準備を探しましょう。', hint2: '最初は「{first}」、次は「{second}」。', explain: '正しい手順は 1 → 2 → 3 → 4 です。', scenarios: [{steps: ['マットの下で鍵を見つける', '玄関の木の棚を開ける', '折りたたんだ地図を取り出す', '最後の宝箱に印をつける']}, {steps: ['保護メガネをかける', '青い粉を2杯はかる', '緑に光るまで混ぜる', 'ラベルのコードを読む']}, {steps: ['暗い廊下でライトをつける', '本棚の鏡に光を当てる', '映った3桁の数字を読む', 'おやつ箱に数字を入れる']}]},
    deductionGrid: {title: '3つのヒント推理', story: '3つのアイテムに数字が割り当てられています。', prompt: '3つのヒントを組み合わせて3桁のコードを見つけよう。', hint1: '1番目を除外できるヒントから考えよう。', hint2: '最初の数字は {firstDigit}、最後は {lastDigit}。', explain: '消去法により {code} に決まります。', items: ['赤い封筒', '青い箱', '金の鍵'], clueNotFirst: '{item} の数字は {d} で、1番目ではありません。', clueEven: '1番目は {limit} より小さい偶数です。', clueGreater: '{itemA} は {itemB} より大きい数字です。', finalQuestion: '赤い封筒・青い箱・金の鍵の順に3桁を入力してください。'},
    patternOddOne: {title: 'ルール違反のタイルを探せ', story: '6枚のタイルのうち1枚だけ仲間はずれがあります。', prompt: '形・色・点の数を見比べて、違う1枚をクリックしよう。', hint1: '点の数と外側の図形の両方を比べてください。', hint2: 'タイル #{rowHint} をよく見てみよう。', explain: 'タイル #{tileNum} だけルールから外れています。', ruleDots: '1枚を除いてすべて同じ点の数です。', ruleShape: '1枚を除いてすべて同じ図形グループです。'},
  },
  monetization: {
    adSlotLabel: '広告', adNotice: 'Media.net 予約枠（レイアウトシフトなし）', gearHeading: 'おうち脱出ゲームにおすすめのアイテム', gearSubheading: '印刷カードと実物の南京錠・UVペンを組み合わせるとさらに盛り上がります。', disclosure: 'アフィリエイトリンクにより追加費用なしで少額の報酬を得る場合があります。',
    gearItems: [
      {id: 'padlock', title: '暗証番号変更可能な4桁ダイヤル錠', subtitle: 'EscapeCueのコードを実際の箱やバッグに設定できます。', tag: '南京錠', url: 'https://escapecue.bastelar.com/#gear-padlocks'},
      {id: 'uv_pen', title: 'UVブラックライト付き秘密ペン', subtitle: 'UVライトで浮かび上がる隠しヒントを書けます。', tag: '秘密インク', url: 'https://escapecue.bastelar.com/#gear-uv-pens'},
      {id: 'envelopes', title: '番号付きクラフト封筒セット', subtitle: '地点1〜6を家の中で分かりやすく整理。', tag: '封筒キット', url: 'https://escapecue.bastelar.com/#gear-envelopes'},
      {id: 'board_game', title: '家族で遊べる協力型脱出ボードゲーム', subtitle: '自作ゲームの合間のアイデア源にも最適です。', tag: 'ファミリー', url: 'https://escapecue.bastelar.com/#gear-boardgames'},
    ],
  },
  editorial: {
    heading: 'おうち脱出ゲームの作り方・完全ガイド', subheading: '家具を傷つけない隠し場所の工夫や年齢別の難易度調整方法を解説します。',
    stepsTitle: '5ステップで準備完了',
    steps: [
      {title: '1. 使う部屋とテーマを選ぶ', body: 'おうち全体でも、リビング1部屋でもすぐ作れます。'},
      {title: '2. 難易度を調整する', body: 'キッズ向けのかんたんから大人向けのむずかしいまで対応。'},
      {title: '3. SVG間取り図で配置確認', body: 'GM画面で実際の家具に合わせて隠し場所を変更できます。'},
      {title: '4. 印刷カード×タブレット併用', body: '部屋にカードを隠し、画面のダイヤル錠で答え合わせ。'},
      {title: '5. 段階的ヒントでテンポ良く', body: '詰まったらまずヒント1を出し、楽しい流れを保ちましょう。'},
    ],
    difficultyGuideTitle: '年齢・難易度別の調整目安',
    difficultyRows: [
      {level: 'かんたん (6–10歳)', age: '6–10歳', mechanics: '色・図形・数かぞえ', pacing: '20〜30分 · 4地点'},
      {level: 'ふつう (家族)', age: '10歳以上', mechanics: '記号暗号と間取り探索', pacing: '35〜45分 · 5地点'},
      {level: 'むずかしい (上級)', age: '14歳以上', mechanics: '連鎖推理とおまけ課題', pacing: '45〜60分 · 6地点'},
    ],
    safeCluesTitle: '家を傷つけない安全な隠し場所アイデア',
    safeClues: ['養生テープや付箋を使い、強い粘着テープは避けましょう。', '割れ物のそばではなく本や上着のポケットに封筒を入れましょう。', '立ち入り禁止の部屋をスタート前に伝えておきましょう。', '最後の宝箱に小さなおやつや景品を入れておくと盛り上がります。'],
    puzzleGuideTitle: '収録されている7種類のパズル',
    faqTitle: 'よくある質問',
    faqs: [
      {q: 'ネット接続やAIのAPIキーは必要ですか？', a: 'いいえ。すべてブラウザ内で100%ローカル動作します。'},
      {q: '自宅の間取りに合わせて編集できますか？', a: 'はい。GM画面から各地点の隠し場所や文章を自由に編集できます。'},
      {q: '作ったゲームを保存できますか？', a: 'localStorageへの自動保存とJSON書き出し・読み込みに対応しています。'},
      {q: '紙に印刷して使えますか？', a: 'はい。印刷キットからGMシートと切り取りカードを印刷できます。'},
    ],
  },
  footer: {
    privacyStatement:
      '100% client-side escape room generator for home, family, kids, and group play. All missions, floorplans, and saved setups stay locally in your browser.',
    canonicalNote: '正規ドメイン: https://escapecue.bastelar.com',
    copyright: '© 2026 EscapeCue · 家族・グループのゲームマスター向け',
  },
};
