import type {SpaceDefinition, SpaceId} from '../types/escape';

export const SPACES: Record<SpaceId, SpaceDefinition> = {
  full_house: {
    id: 'full_house',
    compassDirection: 'N',
    rooms: [
      {id: 'hall', labelKey: 'room_hallway', x: 30, y: 30, w: 220, h: 480, fill: '#F8FAFC', floorPattern: 'tile'},
      {id: 'living', labelKey: 'room_living', x: 250, y: 30, w: 340, h: 280, fill: '#FFFBEB', floorPattern: 'wood'},
      {id: 'kitchen', labelKey: 'room_kitchen', x: 590, y: 30, w: 280, h: 280, fill: '#ECFDF5', floorPattern: 'tile'},
      {id: 'bedroom', labelKey: 'room_bedroom', x: 250, y: 310, w: 620, h: 200, fill: '#EEF2FF', floorPattern: 'carpet'},
    ],
    doors: [
      {x: 250, y: 150, orientation: 'v', width: 46},
      {x: 590, y: 150, orientation: 'v', width: 46},
      {x: 250, y: 380, orientation: 'v', width: 46},
      {x: 410, y: 310, orientation: 'h', width: 48},
    ],
    furniture: [
      {id: 'f_rack', kind: 'coat_rack', labelKey: 'spot_coat_rack', x: 54, y: 74, w: 72, h: 46, roomId: 'hall'},
      {id: 'f_sofa', kind: 'sofa', labelKey: 'spot_sofa', x: 295, y: 68, w: 148, h: 64, roomId: 'living'},
      {id: 'f_tv', kind: 'tv_console', labelKey: 'spot_tv', x: 295, y: 226, w: 140, h: 42, roomId: 'living'},
      {id: 'f_bookshelf', kind: 'bookshelf', labelKey: 'spot_bookshelf', x: 495, y: 62, w: 68, h: 118, roomId: 'living'},
      {id: 'f_lamp', kind: 'lamp', labelKey: 'spot_lamp', x: 510, y: 218, w: 46, h: 46, roomId: 'living'},
      {id: 'f_fridge', kind: 'fridge', labelKey: 'spot_fridge', x: 785, y: 58, w: 62, h: 70, roomId: 'kitchen'},
      {id: 'f_cupboard', kind: 'pantry', labelKey: 'spot_cupboard', x: 625, y: 58, w: 120, h: 46, roomId: 'kitchen'},
      {id: 'f_stove', kind: 'stove', labelKey: 'spot_stove', x: 645, y: 215, w: 120, h: 56, roomId: 'kitchen'},
      {id: 'f_bed', kind: 'bed', labelKey: 'spot_bed', x: 288, y: 348, w: 150, h: 118, roomId: 'bedroom'},
      {id: 'f_desk', kind: 'desk', labelKey: 'spot_desk', x: 495, y: 350, w: 128, h: 64, roomId: 'bedroom'},
      {id: 'f_wardrobe', kind: 'wardrobe', labelKey: 'spot_wardrobe', x: 710, y: 348, w: 126, h: 58, roomId: 'bedroom'},
      {id: 'f_chest', kind: 'chest', labelKey: 'spot_chest', x: 530, y: 440, w: 94, h: 44, roomId: 'bedroom'},
    ],
    hidingSpots: [
      {id: 'spot_coat_rack', labelKey: 'spot_coat_rack', roomId: 'hall', roomLabelKey: 'room_hallway', furnitureId: 'f_rack', x: 118, y: 155},
      {id: 'spot_sofa', labelKey: 'spot_sofa', roomId: 'living', roomLabelKey: 'room_living', furnitureId: 'f_sofa', x: 368, y: 112},
      {id: 'spot_bookshelf', labelKey: 'spot_bookshelf', roomId: 'living', roomLabelKey: 'room_living', furnitureId: 'f_bookshelf', x: 525, y: 120},
      {id: 'spot_tv', labelKey: 'spot_tv', roomId: 'living', roomLabelKey: 'room_living', furnitureId: 'f_tv', x: 365, y: 245},
      {id: 'spot_fridge', labelKey: 'spot_fridge', roomId: 'kitchen', roomLabelKey: 'room_kitchen', furnitureId: 'f_fridge', x: 814, y: 112},
      {id: 'spot_cupboard', labelKey: 'spot_cupboard', roomId: 'kitchen', roomLabelKey: 'room_kitchen', furnitureId: 'f_cupboard', x: 685, y: 82},
      {id: 'spot_stove', labelKey: 'spot_stove', roomId: 'kitchen', roomLabelKey: 'room_kitchen', furnitureId: 'f_stove', x: 705, y: 242},
      {id: 'spot_desk', labelKey: 'spot_desk', roomId: 'bedroom', roomLabelKey: 'room_bedroom', furnitureId: 'f_desk', x: 558, y: 382},
      {id: 'spot_wardrobe', labelKey: 'spot_wardrobe', roomId: 'bedroom', roomLabelKey: 'room_bedroom', furnitureId: 'f_wardrobe', x: 774, y: 378},
      {id: 'spot_chest', labelKey: 'spot_chest', roomId: 'bedroom', roomLabelKey: 'room_bedroom', furnitureId: 'f_chest', x: 576, y: 462},
    ],
  },

  living_room: {
    id: 'living_room',
    compassDirection: 'N',
    rooms: [
      {id: 'living', labelKey: 'room_living', x: 30, y: 30, w: 500, h: 480, fill: '#FFFBEB', floorPattern: 'wood'},
      {id: 'dining', labelKey: 'room_dining', x: 530, y: 30, w: 340, h: 480, fill: '#F8FAFC', floorPattern: 'wood'},
    ],
    doors: [
      {x: 530, y: 220, orientation: 'v', width: 84},
      {x: 240, y: 510, orientation: 'h', width: 54},
    ],
    furniture: [
      {id: 'f_sofa', kind: 'sofa', labelKey: 'spot_sofa', x: 90, y: 85, w: 210, h: 82, roomId: 'living'},
      {id: 'f_tv', kind: 'tv_console', labelKey: 'spot_tv', x: 95, y: 390, w: 205, h: 58, roomId: 'living'},
      {id: 'f_bookshelf', kind: 'bookshelf', labelKey: 'spot_bookshelf', x: 380, y: 65, w: 112, h: 165, roomId: 'living'},
      {id: 'f_lamp', kind: 'lamp', labelKey: 'spot_lamp', x: 64, y: 245, w: 56, h: 56, roomId: 'living'},
      {id: 'f_dining', kind: 'table', labelKey: 'spot_dining_table', x: 605, y: 155, w: 190, h: 170, roomId: 'dining'},
      {id: 'f_cabinet', kind: 'cabinet', labelKey: 'spot_calendar', x: 615, y: 55, w: 165, h: 50, roomId: 'dining'},
    ],
    hidingSpots: [
      {id: 'spot_sofa', labelKey: 'spot_sofa', roomId: 'living', roomLabelKey: 'room_living', furnitureId: 'f_sofa', x: 195, y: 126},
      {id: 'spot_lamp', labelKey: 'spot_lamp', roomId: 'living', roomLabelKey: 'room_living', furnitureId: 'f_lamp', x: 92, y: 274},
      {id: 'spot_tv', labelKey: 'spot_tv', roomId: 'living', roomLabelKey: 'room_living', furnitureId: 'f_tv', x: 198, y: 418},
      {id: 'spot_bookshelf', labelKey: 'spot_bookshelf', roomId: 'living', roomLabelKey: 'room_living', furnitureId: 'f_bookshelf', x: 436, y: 146},
      {id: 'spot_dining_table', labelKey: 'spot_dining_table', roomId: 'dining', roomLabelKey: 'room_dining', furnitureId: 'f_dining', x: 700, y: 240},
      {id: 'spot_calendar', labelKey: 'spot_calendar', roomId: 'dining', roomLabelKey: 'room_dining', furnitureId: 'f_cabinet', x: 696, y: 82},
    ],
  },

  kitchen: {
    id: 'kitchen',
    compassDirection: 'N',
    rooms: [
      {id: 'kitchen', labelKey: 'room_kitchen', x: 30, y: 30, w: 540, h: 480, fill: '#ECFDF5', floorPattern: 'tile'},
      {id: 'pantry', labelKey: 'room_pantry', x: 570, y: 30, w: 300, h: 480, fill: '#F8FAFC', floorPattern: 'tile'},
    ],
    doors: [
      {x: 570, y: 230, orientation: 'v', width: 64},
      {x: 240, y: 510, orientation: 'h', width: 54},
    ],
    furniture: [
      {id: 'f_fridge', kind: 'fridge', labelKey: 'spot_fridge', x: 70, y: 65, w: 104, h: 112, roomId: 'kitchen'},
      {id: 'f_stove', kind: 'stove', labelKey: 'spot_stove', x: 250, y: 65, w: 180, h: 86, roomId: 'kitchen'},
      {id: 'f_counter', kind: 'counter', labelKey: 'spot_jars', x: 165, y: 280, w: 220, h: 96, roomId: 'kitchen'},
      {id: 'f_cupboard', kind: 'pantry', labelKey: 'spot_cupboard', x: 620, y: 70, w: 205, h: 78, roomId: 'pantry'},
      {id: 'f_spices', kind: 'bookshelf', labelKey: 'spot_spices', x: 645, y: 230, w: 165, h: 130, roomId: 'pantry'},
      {id: 'f_table_k', kind: 'table', labelKey: 'spot_dining_table', x: 65, y: 365, w: 115, h: 96, roomId: 'kitchen'},
    ],
    hidingSpots: [
      {id: 'spot_fridge', labelKey: 'spot_fridge', roomId: 'kitchen', roomLabelKey: 'room_kitchen', furnitureId: 'f_fridge', x: 122, y: 122},
      {id: 'spot_stove', labelKey: 'spot_stove', roomId: 'kitchen', roomLabelKey: 'room_kitchen', furnitureId: 'f_stove', x: 340, y: 108},
      {id: 'spot_jars', labelKey: 'spot_jars', roomId: 'kitchen', roomLabelKey: 'room_kitchen', furnitureId: 'f_counter', x: 275, y: 328},
      {id: 'spot_cupboard', labelKey: 'spot_cupboard', roomId: 'pantry', roomLabelKey: 'room_pantry', furnitureId: 'f_cupboard', x: 722, y: 110},
      {id: 'spot_spices', labelKey: 'spot_spices', roomId: 'pantry', roomLabelKey: 'room_pantry', furnitureId: 'f_spices', x: 728, y: 294},
      {id: 'spot_dining_table', labelKey: 'spot_dining_table', roomId: 'kitchen', roomLabelKey: 'room_kitchen', furnitureId: 'f_table_k', x: 122, y: 412},
    ],
  },

  bedroom: {
    id: 'bedroom',
    compassDirection: 'N',
    rooms: [
      {id: 'bedroom', labelKey: 'room_bedroom', x: 30, y: 30, w: 520, h: 480, fill: '#EEF2FF', floorPattern: 'carpet'},
      {id: 'study', labelKey: 'room_study', x: 550, y: 30, w: 320, h: 480, fill: '#F8FAFC', floorPattern: 'wood'},
    ],
    doors: [
      {x: 550, y: 240, orientation: 'v', width: 70},
      {x: 240, y: 510, orientation: 'h', width: 54},
    ],
    furniture: [
      {id: 'f_bed', kind: 'bed', labelKey: 'spot_bed', x: 75, y: 80, w: 220, h: 175, roomId: 'bedroom'},
      {id: 'f_wardrobe', kind: 'wardrobe', labelKey: 'spot_wardrobe', x: 345, y: 70, w: 160, h: 80, roomId: 'bedroom'},
      {id: 'f_chest', kind: 'chest', labelKey: 'spot_chest', x: 105, y: 345, w: 156, h: 86, roomId: 'bedroom'},
      {id: 'f_desk', kind: 'desk', labelKey: 'spot_desk', x: 600, y: 85, w: 210, h: 92, roomId: 'study'},
      {id: 'f_bookcase', kind: 'bookshelf', labelKey: 'spot_bookshelf', x: 615, y: 270, w: 185, h: 95, roomId: 'study'},
      {id: 'f_board', kind: 'whiteboard', labelKey: 'spot_calendar', x: 340, y: 380, w: 165, h: 52, roomId: 'bedroom'},
    ],
    hidingSpots: [
      {id: 'spot_bed', labelKey: 'spot_bed', roomId: 'bedroom', roomLabelKey: 'room_bedroom', furnitureId: 'f_bed', x: 185, y: 168},
      {id: 'spot_wardrobe', labelKey: 'spot_wardrobe', roomId: 'bedroom', roomLabelKey: 'room_bedroom', furnitureId: 'f_wardrobe', x: 425, y: 110},
      {id: 'spot_chest', labelKey: 'spot_chest', roomId: 'bedroom', roomLabelKey: 'room_bedroom', furnitureId: 'f_chest', x: 183, y: 388},
      {id: 'spot_calendar', labelKey: 'spot_calendar', roomId: 'bedroom', roomLabelKey: 'room_bedroom', furnitureId: 'f_board', x: 422, y: 406},
      {id: 'spot_desk', labelKey: 'spot_desk', roomId: 'study', roomLabelKey: 'room_study', furnitureId: 'f_desk', x: 705, y: 130},
      {id: 'spot_bookshelf', labelKey: 'spot_bookshelf', roomId: 'study', roomLabelKey: 'room_study', furnitureId: 'f_bookcase', x: 708, y: 318},
    ],
  },

  garden: {
    id: 'garden',
    compassDirection: 'N',
    rooms: [
      {id: 'patio', labelKey: 'room_patio', x: 30, y: 30, w: 380, h: 480, fill: '#FEF3C7', floorPattern: 'stone'},
      {id: 'lawn', labelKey: 'room_lawn', x: 410, y: 30, w: 460, h: 480, fill: '#ECFDF5', floorPattern: 'grass'},
    ],
    doors: [
      {x: 410, y: 230, orientation: 'v', width: 96},
      {x: 180, y: 30, orientation: 'h', width: 64},
    ],
    furniture: [
      {id: 'f_pergola', kind: 'pergola', labelKey: 'spot_pergola', x: 80, y: 80, w: 260, h: 120, roomId: 'patio'},
      {id: 'f_steps', kind: 'steps', labelKey: 'spot_steps', x: 295, y: 245, w: 96, h: 120, roomId: 'patio'},
      {id: 'f_planter1', kind: 'planter', labelKey: 'spot_planter', x: 90, y: 350, w: 120, h: 90, roomId: 'patio'},
      {id: 'f_bench', kind: 'bench', labelKey: 'spot_bench', x: 540, y: 110, w: 210, h: 80, roomId: 'lawn'},
      {id: 'f_planter2', kind: 'planter', labelKey: 'spot_planter', x: 640, y: 330, w: 150, h: 98, roomId: 'lawn'},
      {id: 'f_table_g', kind: 'table', labelKey: 'spot_dining_table', x: 465, y: 310, w: 120, h: 110, roomId: 'lawn'},
    ],
    hidingSpots: [
      {id: 'spot_pergola', labelKey: 'spot_pergola', roomId: 'patio', roomLabelKey: 'room_patio', furnitureId: 'f_pergola', x: 210, y: 140},
      {id: 'spot_steps', labelKey: 'spot_steps', roomId: 'patio', roomLabelKey: 'room_patio', furnitureId: 'f_steps', x: 342, y: 305},
      {id: 'spot_planter', labelKey: 'spot_planter', roomId: 'patio', roomLabelKey: 'room_patio', furnitureId: 'f_planter1', x: 150, y: 395},
      {id: 'spot_bench', labelKey: 'spot_bench', roomId: 'lawn', roomLabelKey: 'room_lawn', furnitureId: 'f_bench', x: 645, y: 150},
      {id: 'spot_dining_table', labelKey: 'spot_dining_table', roomId: 'lawn', roomLabelKey: 'room_lawn', furnitureId: 'f_table_g', x: 525, y: 365},
      {id: 'spot_lamp', labelKey: 'spot_lamp', roomId: 'lawn', roomLabelKey: 'room_lawn', furnitureId: 'f_planter2', x: 715, y: 380},
    ],
  },

  other_space: {
    id: 'other_space',
    compassDirection: 'N',
    rooms: [
      {id: 'main_hall', labelKey: 'room_main_hall', x: 30, y: 30, w: 540, h: 480, fill: '#F8FAFC', floorPattern: 'tile'},
      {id: 'breakout', labelKey: 'room_breakout', x: 570, y: 30, w: 300, h: 480, fill: '#EEF2FF', floorPattern: 'carpet'},
    ],
    doors: [
      {x: 570, y: 220, orientation: 'v', width: 76},
      {x: 240, y: 510, orientation: 'h', width: 56},
    ],
    furniture: [
      {id: 'f_whiteboard', kind: 'whiteboard', labelKey: 'spot_whiteboard', x: 110, y: 58, w: 260, h: 48, roomId: 'main_hall'},
      {id: 'f_desk1', kind: 'table', labelKey: 'spot_dining_table', x: 95, y: 185, w: 170, h: 120, roomId: 'main_hall'},
      {id: 'f_desk2', kind: 'desk', labelKey: 'spot_desk', x: 325, y: 205, w: 175, h: 95, roomId: 'main_hall'},
      {id: 'f_cabinet', kind: 'cabinet', labelKey: 'spot_cabinet', x: 625, y: 75, w: 185, h: 78, roomId: 'breakout'},
      {id: 'f_bookshelf_o', kind: 'bookshelf', labelKey: 'spot_bookshelf', x: 635, y: 245, w: 175, h: 110, roomId: 'breakout'},
      {id: 'f_rack_o', kind: 'coat_rack', labelKey: 'spot_coat_rack', x: 115, y: 390, w: 135, h: 66, roomId: 'main_hall'},
    ],
    hidingSpots: [
      {id: 'spot_whiteboard', labelKey: 'spot_whiteboard', roomId: 'main_hall', roomLabelKey: 'room_main_hall', furnitureId: 'f_whiteboard', x: 240, y: 82},
      {id: 'spot_dining_table', labelKey: 'spot_dining_table', roomId: 'main_hall', roomLabelKey: 'room_main_hall', furnitureId: 'f_desk1', x: 180, y: 245},
      {id: 'spot_desk', labelKey: 'spot_desk', roomId: 'main_hall', roomLabelKey: 'room_main_hall', furnitureId: 'f_desk2', x: 412, y: 252},
      {id: 'spot_coat_rack', labelKey: 'spot_coat_rack', roomId: 'main_hall', roomLabelKey: 'room_main_hall', furnitureId: 'f_rack_o', x: 182, y: 422},
      {id: 'spot_cabinet', labelKey: 'spot_cabinet', roomId: 'breakout', roomLabelKey: 'room_breakout', furnitureId: 'f_cabinet', x: 718, y: 114},
      {id: 'spot_bookshelf', labelKey: 'spot_bookshelf', roomId: 'breakout', roomLabelKey: 'room_breakout', furnitureId: 'f_bookshelf_o', x: 722, y: 300},
    ],
  },
};
