import { StatType } from './types/models'

export const getLogoImageSrc = (): any => {
  switch (process.env.REACT_APP_NAME) {
    case 'IDCC':
      return require('./assets/images/idcc-logo.svg')
  }
  return require('./assets/images/ixo-logo.svg')
}

export const getBGImageSrc = (): any => {
  switch (process.env.REACT_APP_NAME) {
    case 'IDCC':
      return require('./assets/images/idcc-heroBg.jpg')
  }
  return require('./assets/images/ixo-heroBg.jpg')
}

export const getCirculationHeroConfig = (): Record<string, any> => {
  switch (process.env.REACT_APP_NAME) {
    case 'IDCC':
      return {
        type: StatType.decimal,
        title: 'FUNDS RAISED HKD',
        descriptor: [{ class: 'text', value: ' ' }],
        amount: 0,
      }
  }

  return {
    type: StatType.fraction,
    title: 'TOTAL IXO IN CIRCULATION',
    descriptor: [{ class: 'text', value: 'IXO staked to date' }],
    amount: [0, 0],
  }
}