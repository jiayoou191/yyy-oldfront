export const TRANSPACKS = {
  AIR: 0,
  OFCL: 1,
  OLCL: 2,
  RFCL: 3,
  RLCL: 4,
  EXPRESS: 5,
}
export const TRANSPACKTYPES = {
  0: '空运',
  1: '海运整箱',
  2: '海运拼箱',
  3: '铁运整箱',
  4: '铁运拼箱',
  5: '国际快递',
}
export const PLANTYPES = {
  0: '海运',
  1: '空运',
  2: '铁运',
  3: '国际快递',
}

export const BOXS = {
  1: {
    name: '20gp',
    weightlimit: 27000,
    volumelimit: 28,
  },
  2: {
    name: '40gp',
    weightlimit: 26000,
    volumelimit: 58,
  },
  3: {
    name: '40hq',
    weightlimit: 25500,
    volumelimit: 68,
  },
}

export const CHARGEDETAIL = {
  FCL: [
    {
      name: '内陆运输费',
      content: ['bkf', 'seal']
    },
    {
      name: '码头及操作费',
      content: ['thc', 'vgm', 'security', 'psc']
    },
    {
      name: '清关及舱单费',
      content: ['ccl', 'edi', 'ens', 'icc', 'ecc']
    },
    {
      name: '文件及操作费',
      content: ['doc', 'do', 'hdc']
    },
    {
      name: '其他杂项费',
      content: []
    }
  ],
  LCL: [
    {
      name: '内陆运输费',
      content: []
    },
    {
      name: '仓库及管理费',
      content: ['ped', 'loading', 'unloading', 'entry', 'devaning', 'devan',  'inland', 'icf', 'dpc', 'warehouse', 'thc']
    },
    {
      name: '清关及舱单费',
      content: ['ccl', 'ciq', 'ciqhdc', 'icc', 'ecc']
    },
    {
      name: '文件及操作费',
      content: ['doc', 'do', 'dohdc', 'hdc']
    },
    {
      name: '其他杂项费',
      content: ['insurance', 'caf']
    }
  ],
  AIR: [
    {
      name: '内陆运输费',
      content: ['bkf', 'seal']
    },
    {
      name: '机场及操作费',
      content: ['thc', 'vgm', 'security', 'psc']
    },
    {
      name: '清关及舱单费',
      content: ['ccl', 'edi', 'ens', 'icc', 'ecc', 'ciq']
    },
    {
      name: '文件及操作费',
      content: ['doc', 'do', 'hdc']
    },
    {
      name: '其他杂项费',
      content: []
    }
  ],
  EXPRESS: [
    {
      name: '清关费',
      content: ['icc', 'ecc']
    }
  ]
}