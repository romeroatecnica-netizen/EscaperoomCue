import type {TranslationDictionary} from './types';

export const zh: TranslationDictionary = {
  brand: 'EscapeCue',
  seo: {
    title: 'EscapeCue — 家庭密室逃脱生成器、SVG交互户型图与谜题训练器',
    description: '在交互式SVG户型图上设计、预览并主持家庭或空间密室逃脱。100%本地运行，提供分级提示与可打印道具包。',
    ogTitle: 'EscapeCue — 家庭密室逃脱生成器与户型图编辑器',
    ogDescription: '为孩子、家庭和朋友打造定制家庭密室，包含7种图形谜题、难度分级和可打印主持人手册。',
    appCategory: 'GameApplication',
  },
  nav: {generator: '主持人工作室', floorplan: 'SVG户型图', printKit: '打印套件', guide: '主持指南', newMission: '新任务'},
  hero: {
    kicker: '主持人工作台 · 100% 本地运行',
    title: '几分钟内在家里搭建难忘的密室逃脱游戏',
    subtitle: '选择房间与适合孩子或成人的难度，在交互式SVG户型图上确认每个藏匿点，并打印实体线索卡。',
    privacyBanner:
      '100% client-side escape room generator for home, family, kids, and group play. All missions, floorplans, and saved setups stay locally in your browser.',
  },
  controls: {
    spaceLabel: '空间场景', difficultyLabel: '难度等级', themeLabel: '任务主题', seedLabel: '随机种子', regenerate: '重新生成', viewModeLabel: '视图切换', gmView: '主持人视图 (GM)', playerView: '玩家视图', soundOn: '音效开启', soundOff: '已静音', timerStart: '开始计时', timerPause: '暂停', timerReset: '重置', targetDuration: '目标时长', minutesUnit: '分钟', exportJson: '导出 JSON', importJson: '导入 JSON', saveSetup: '保存配置', savedList: '已保存方案', printPhysicalKit: '打印实体套件', addStation: '添加关卡', importSuccess: '已从 JSON 成功导入任务。', importError: '无效的 EscapeCue JSON 文件。', saveSuccess: '已保存在本地浏览器中。',
  },
  spaces: {
    full_house: {name: '全屋探索（多房间）', shortDesc: '客厅、厨房、卧室与玄关走廊'},
    living_room: {name: '客厅与餐厅', shortDesc: '沙发、餐桌、书架、电视柜与落地灯'},
    kitchen: {name: '厨房与储藏室', shortDesc: '冰箱贴、橱柜、定时器与调料架'},
    bedroom: {name: '卧室 / 儿童青少年区', shortDesc: '书桌、书柜、衣柜与玩具箱'},
    garden: {name: '花园、露台或阳台', shortDesc: '花盆、长椅、石阶与凉棚'},
    other_space: {name: '其他空间（教室 / 办公室 / 旅途）', shortDesc: '随时随地灵活布置的团队空间'},
  },
  difficulties: {
    easy: {name: '简单', ageHint: '儿童 / 入门 (6–10岁)', summary: '4个关卡 · 颜色、计数与直观提示'},
    medium: {name: '中等', ageHint: '家庭 / 探索者 (10岁+)', summary: '5个关卡 · 符号密码、天平推理与平面寻物'},
    hard: {name: '困难', ageHint: '挑战 / 专家 (14岁+)', summary: '6个关卡 · 连锁规则、排除法与附加挑战'},
  },
  themes: {
    lost_key: {name: '丢失的家里钥匙之谜', intro: '电影之夜前备用钥匙不见了！沿着房间里的线索找回零食宝箱钥匙。', finale: '钥匙盒解锁！家庭电影夜完美开启。', bonus: '附加挑战：不看地图，倒序说出经过的所有房间名称。'},
    lab_rescue: {name: '实验室救援行动', intro: '冒泡实验锁住了科学柜。在倒计时结束前破译配方笔记。', finale: '密封解除，实验配方已安全中和！', bonus: '附加挑战：凭记忆倒背最终校验数字。'},
    treasure_map: {name: '藏宝图密码之谜', intro: '爷爷在家里藏了一只黄铜指南针和宝箱。拼合散落的坐标吧。', finale: '找到X标记点了！收获指南针与家庭宝藏。', bonus: '附加挑战：15秒内画出从第1站到宝箱的路线。'},
    space_alert: {name: '空间站警报', intro: '家里各扇区的导航信标离线了。重启所有模块以恢复自动驾驶。', finale: '全部推进器绿灯！自动驾驶已恢复。', bonus: '附加挑战：全程无声用手势传递最终密码。'},
    chronometer_chest: {name: '天文钟宝箱', intro: '古董怀表在午夜停摆。对齐隐藏在房间里的齿轮与符号。', finale: '钟摆重新摆动，宝箱弹开！', bonus: '附加挑战：算出本局所有数字密码的总和。'},
  },
  roomsAndSpots: {
    room_living: '客厅', room_kitchen: '厨房', room_bedroom: '卧室', room_hallway: '玄关走廊', room_dining: '餐厅区', room_pantry: '储藏角', room_study: '书桌区', room_patio: '露台凉棚', room_lawn: '花园小径', room_main_hall: '主活动区', room_breakout: '侧翼站点',
    spot_sofa: '沙发坐垫下方', spot_bookshelf: '书架书本后方', spot_tv: '电视柜抽屉内', spot_dining_table: '餐椅底部粘贴处', spot_lamp: '落地灯底座旁', spot_fridge: '冰箱贴纸背面', spot_cupboard: '干货橱柜内侧', spot_stove: '厨房定时器旁', spot_jars: '量杯罐子后面', spot_spices: '调料架层板上', spot_desk: '书桌笔盘底下', spot_wardrobe: '衣柜外套口袋里', spot_chest: '玩具收纳箱内', spot_calendar: '挂历翻页背面', spot_bed: '枕头边角下方', spot_coat_rack: '衣帽架挂钩信封', spot_planter: '陶土花盆边缘下', spot_bench: '花园长椅板条下', spot_steps: '第三级石阶旁', spot_pergola: '凉棚横梁悬挂处', spot_whiteboard: '白板笔槽内', spot_cabinet: '储物柜顶部',
  },
  puzzleTypes: {
    color_symbol_lock: {name: '色彩与几何密码锁', badge: '视觉转盘'},
    visual_cipher: {name: '图形符号密码表', badge: '译码'},
    number_balance: {name: '天平称重与数列', badge: '逻辑'},
    floorplan_search: {name: '户型图定向寻物', badge: '空间'},
    chronology_order: {name: '事件时间排序', badge: '序列'},
    deduction_grid: {name: '三线索排除推理', badge: '推理'},
    pattern_odd_one: {name: '图形规律找不同', badge: '观察'},
  },
  station: {
    stationLabel: '第', ofLabel: '站 / 共', solvedLabel: '已解开', lockedLabel: '未解锁', activeLabel: '当前关卡', hidingSpotLabel: '藏匿位置', gmNoteLabel: '主持人布置提示', solutionLabel: '正确答案', hint1Btn: '提示 1（轻度）', hint2Btn: '提示 2（明确）', revealSolutionBtn: '查看答案 (GM)', hint1Label: '轻度提示', hint2Label: '明确提示', explanationLabel: '解题逻辑', enterCodePlaceholder: '输入密码或答案', checkAnswer: '解锁关卡', wrongAttempt: '还不对哦，再看看线索或使用提示 1。', unlockedToast: '关卡已解锁！前往地图上的下一站。', editStation: '编辑关卡', moveUp: '上移', moveDown: '下移', deleteStation: '删除', regenPuzzle: '换一题', nextStation: '下一关', missionCompleteTitle: '任务大功告成！', missionCompleteDesc: '所有关卡均已解开，快查看你们的通关用时吧！', playAgain: '再玩一次', bonusChallengeLabel: '可选附加挑战',
    colorLabels: {indigo: '靛蓝', emerald: '翠绿', amber: '琥珀', rose: '珊瑚红', sky: '天蓝'},
    shapeLabels: {circle: '圆形', triangle: '三角', square: '方形', star: '星形', diamond: '菱形'},
    clickTilePrompt: '点击唯一打破视觉规律的图块：', orderStepsPrompt: '按正确时间顺序（1到4）依次点击四张卡片：', resetOrder: '清空重排', tapDialsPrompt: '点击每个密码盘切换颜色与形状：',
  },
  floorplan: {titleGm: '交互式户型图 — 主持人蓝图', titlePlayer: '交互式户型图 — 玩家探索地图', subtitleGm: '一目了然查看全部藏匿点、关卡顺序与答案。点击标记即可编辑。', subtitlePlayer: '实时追踪探索进度，不会剧透未解锁答案。', legendActive: '当前关卡', legendSolved: '已解决', legendLocked: '未解锁', legendSpot: '可用藏匿点', clickPinHint: '点击地图上的站点标记查看详情。', reassignSpot: '将站点移至此处'},
  editor: {modalTitle: '自定义关卡', titleField: '关卡标题', spotField: '平面图藏匿点', storyField: '剧情片段', promptField: '谜题描述', setupNoteField: '实体布置备注', solutionField: '标准答案', hint1Field: '提示 1', hint2Field: '提示 2', saveChanges: '保存修改', cancel: '取消'},
  savedModal: {title: '已保存的家庭方案（本地存储）', empty: '暂无已保存方案，点击“保存配置”即可留存。', loadBtn: '载入', deleteBtn: '删除', closeBtn: '关闭', stationsCount: '个关卡'},
  printKit: {gmSheetTitle: '主持人布置清单', gmSheetSubtitle: '在玩家入场前，将每张卡片藏到对应位置。', playerCardsTitle: '可打印线索卡片', playerCardsSubtitle: '沿虚线剪下并藏入各个房间。', cutLineLabel: '沿此裁剪', placeAtLabel: '藏匿位置', codeToEnterLabel: '解锁密码', backToStudio: '返回工作室', printNow: '立即打印'},
  puzzleTemplates: {
    colorLock: {title: '棱镜色彩密码锁', story: '彩色几何徽章封印了下一个信封。', prompt: '根据线索调整转盘的颜色和图形顺序。', clueFirst: '第 1 位是 {color}（{shape}）。', clueLast: '最后一位是 {color}（{shape}）。', clueMiddle: '第 {pos} 位紧跟在 {prevColor} 之后，是 {color}（{shape}）。', clueNoRepeat: '每个转盘颜色互不相同。', hint1: '先确定第一位和最后一位。', hint2: '从左到右颜色顺序：{preview}。', explain: '按位置规则匹配得到 {code}。'},
    visualCipher: {title: '符号密码对照表', story: '纸条上的文字被替换成了神秘符号。', promptDigits: '对照密码表翻译出数字密码。', promptWord: '对照密码表拼出秘密单词。', hint1: '从左到右逐个对照符号表。', hint2: '前两位字符是 {prefix}。', explain: '一一对应译出 {code}。', wordsEasy: ['KEY', 'MAP', 'SUN', 'BOX', 'CAT'], wordsMedium: ['LAMP', 'DOOR', 'BOOK', 'STAR', 'CLUE'], wordsHard: ['VAULT', 'CLOCK', 'PRISM', 'SPARK', 'CIPHER']},
    numberBalance: {title: '天平称重与数列', story: '黄铜天平与数字条锁住了卡扣。', prompt: '推算问号 (?) 处的数值以保持平衡。', hint1: '先从第一行算出单个图形的重量。', hint2: '结果接近 {near}。', explain: '逐行推算得出密码 {code}。', ruleLabel: '数列规律'},
    floorplanSearch: {title: '房间平面定向寻物', story: '平面图指向房间里安全藏好的实体线索。', prompt: '根据空间线索找到对应点并输入密码。', clueRoom: '前往：{room}。', clueSpot: '检查位置：{spot}。', clueCount: '读取 {len} 位数字标记。', hint1: '查看 SVG 平面图中的 {room}。', hint2: '检查 {spot}；密码以 {prefix} 开头。', explain: '在 {room} 的 {spot} 找到 {code}。'},
    chronologyOrder: {title: '行动时间线', story: '四张打乱的卡片记录了事件经过。', prompt: '按从早到晚的逻辑顺序点击4张卡片。', hint1: '先找开门前最开始的准备动作。', hint2: '前两步是“{first}”，接着是“{second}”。', explain: '正确因果顺序为 1 → 2 → 3 → 4。', scenarios: [{steps: ['在地垫下找到黄铜钥匙', '打开走廊木柜', '取出折叠好的纸质地图', '圈出最终宝箱位置']}, {steps: ['戴上实验室护目镜', '量取两勺蓝色粉末', '搅拌直到发出绿光', '读取标签上的密码']}, {steps: ['在走廊打开手电筒', '将光束照向书架镜子', '读取反射的三位数字', '在零食盒上输入数字']}]},
    deductionGrid: {title: '三线索排除法', story: '三个物品对应不同数字，只有一个组合全部符合。', prompt: '结合三条线索推算3位密码。', hint1: '先从排除第1位的线索入手。', hint2: '第一位是 {firstDigit}，最后一位是 {lastDigit}。', explain: '排除不可能项后得到 {code}。', items: ['红信封', '蓝盒子', '金钥匙'], clueNotFirst: '{item} 对应的数字是 {d}，且不在第1位。', clueEven: '第1位是小于 {limit} 的偶数。', clueGreater: '{itemA} 的数字大于 {itemB}。', finalQuestion: '按顺序输入3位数字：红信封、蓝盒子、金钥匙。'},
    patternOddOne: {title: '找出破绽图块', story: '六块图砖中有一块打破了规律。', prompt: '观察图形、颜色和点数，点击唯一不符合规律的图块。', hint1: '同时比较内部点数和外部几何形状。', hint2: '重点观察第 #{rowHint} 块。', explain: '第 #{tileNum} 块打破了共同规律。', ruleDots: '除了一块之外，其余图块点数完全相同。', ruleShape: '除了一块之外，其余图块属于同一形状类别。'},
  },
  monetization: {
    adSlotLabel: '广告', adNotice: 'Media.net 预留广告位（零布局偏移）', gearHeading: '家庭密室推荐实体道具', gearSubheading: '可将 EscapeCue 打印卡片搭配真实密码锁与隐形墨水笔使用。', disclosure: '推广链接可能会带来少量佣金，但不会增加您的购买成本。',
    gearItems: [
      {id: 'padlock', title: '可调四位密码挂锁', subtitle: '把 EscapeCue 生成的密码设到真实盒子或背包上。', tag: '实体锁', url: 'https://escapecue.bastelar.com/#gear-padlocks'},
      {id: 'uv_pen', title: 'UV 隐形墨水笔与小手电', subtitle: '在打印卡片上写下只有紫外灯可见的秘密线索。', tag: '隐形线索', url: 'https://escapecue.bastelar.com/#gear-uv-pens'},
      {id: 'envelopes', title: '牛皮纸编号线索信封', subtitle: '清晰标记 1–6 号关卡，孩子一眼就能认出。', tag: '信封套件', url: 'https://escapecue.bastelar.com/#gear-envelopes'},
      {id: 'board_game', title: '家庭合作解谜桌游', subtitle: '自制家庭密室之余的优质灵感来源。', tag: '家庭游戏', url: 'https://escapecue.bastelar.com/#gear-boardgames'},
    ],
  },
  editorial: {
    heading: '家庭密室逃脱完全搭建指南', subheading: '安全藏匿线索、按年龄调整难度与提升玩家体验的实用手册。',
    stepsTitle: '5步在家里举办一场密室逃脱',
    steps: [
      {title: '1. 选定居家空间与主题', body: '全屋探索适合热闹派对，单房间适合20分钟快玩。'},
      {title: '2. 设定真实匹配的难度', body: '简单主打颜色与计数，中等加入密码与平面寻物，困难支持连锁推理。'},
      {title: '3. 在 SVG 平面图上核对点位', body: '主持人视图可拖拽或重选家具藏匿点，贴合真实户型。'},
      {title: '4. 打印实体卡片 + 平板验证密码', body: '纸质卡片藏进房间，电子面板留在客厅作为总密码锁。'},
      {title: '5. 适时给予分级提示', body: '卡关超过4分钟可先给提示1，保持游戏节奏。'},
    ],
    difficultyGuideTitle: '按年龄与难度适配谜题',
    difficultyRows: [
      {level: '简单 (6–10岁)', age: '6–10岁', mechanics: '颜色、形状与简单计数', pacing: '20–30分钟 · 4关'},
      {level: '中等 (家庭)', age: '10岁+', mechanics: '图形译码与空间搜索', pacing: '35–45分钟 · 5关'},
      {level: '困难 (挑战)', age: '14岁+', mechanics: '多步逻辑与附加挑战', pacing: '45–60分钟 · 6关'},
    ],
    safeCluesTitle: '不伤家具的安全藏匿技巧',
    safeClues: ['使用和纸胶带或便利贴固定在椅背或桌底。', '将信封夹在书页或大衣口袋中，远离易碎品。', '开局前明确告知不可进入的房间。', '在最后一关放入小零食或奖品作为惊喜。'],
    puzzleGuideTitle: '内置7种交互图形谜题',
    faqTitle: '常见问题',
    faqs: [
      {q: '需要联网或 AI API 密钥吗？', a: '不需要，全部功能在本地浏览器确定性运行。'},
      {q: '可以按我家真实布局修改藏匿点吗？', a: '可以，在主持人视图点击任意站点即可编辑位置与文案。'},
      {q: '如何保存和分享我的关卡？', a: '支持 localStorage 自动保存，以及 JSON 导出和导入。'},
      {q: '支持打印出来玩吗？', a: '支持，打印套件会自动生成主持人总表与裁剪线索卡。'},
    ],
  },
  footer: {
    privacyStatement:
      '100% client-side escape room generator for home, family, kids, and group play. All missions, floorplans, and saved setups stay locally in your browser.',
    canonicalNote: '规范域名：https://escapecue.bastelar.com',
    copyright: '© 2026 EscapeCue · 专为家庭与团队主持人打造',
  },
};
