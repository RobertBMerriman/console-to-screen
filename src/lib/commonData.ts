export type RatioWithType =
  | {
      ratioX: 4
      ratioY: 3
      ratioType: '4:3'
    }
  | {
      ratioX: 16
      ratioY: 9
      ratioType: '16:9'
    }
  | {
      ratioX: 3
      ratioY: 2
      ratioType: '3:2'
    }
  | {
      ratioX: 1
      ratioY: 1
      ratioType: '1:1'
    }
  | {
      ratioX: number
      ratioY: number
      ratioType: 'Other'
    }

export type ResAndRatioWithType = RatioWithType & {
  resX: number
  resY: number
}

export type ResAndRatio = Omit<ResAndRatioWithType, 'ratioType'>

export const ratio4by3: RatioWithType = {
  ratioX: 4,
  ratioY: 3,
  ratioType: '4:3',
}

export const ratio16by9: RatioWithType = {
  ratioX: 16,
  ratioY: 9,
  ratioType: '16:9',
}

export const ratio3by2: RatioWithType = {
  ratioX: 3,
  ratioY: 2,
  ratioType: '3:2',
}

export const ratio1by1: RatioWithType = {
  ratioX: 1,
  ratioY: 1,
  ratioType: '1:1',
}

// 4:3
export const p240: ResAndRatioWithType = {
  resX: 320,
  resY: 240,
  ...ratio4by3,
}

export const p480: ResAndRatioWithType = {
  resX: 640,
  resY: 480,
  ...ratio4by3,
}

export const p560: ResAndRatioWithType = {
  resX: 752,
  resY: 560,
  ...ratio4by3,
}

export const p768: ResAndRatioWithType = {
  resX: 1024,
  resY: 768,
  ...ratio4by3,
}

export const p960: ResAndRatioWithType = {
  resX: 1280,
  resY: 960,
  ...ratio4by3,
}

// 16:9
export const p720: ResAndRatioWithType = {
  resX: 1280,
  resY: 720,
  ...ratio16by9,
}

export const p1080: ResAndRatioWithType = {
  resX: 1920,
  resY: 1080,
  ...ratio16by9,
}

// 3:2
export const p640_3by2: ResAndRatioWithType = {
  resX: 960,
  resY: 640,
  ...ratio3by2,
}

// 1:1
export const p720_1by1 = {
  resX: 720,
  resY: 720,
  ...ratio1by1,
}

// Other
export const whyThisRatio: ResAndRatioWithType = {
  resX: 1240,
  resY: 1080,
  ratioX: 31,
  ratioY: 27,
  ratioType: 'Other',
}
