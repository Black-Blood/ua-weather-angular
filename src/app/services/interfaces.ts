export interface IRequestsBody {
  coordinates?: ICoordinates
  settlement?: ISettlement
  searchSettlement?: string
  language?: string
  changeSettlementsRadius?: boolean
}

export interface ICoordinates {
  longitude: number
  latitude: number
}

export interface ISettlement {
  id: number

  rate?: number

  names: { [key: string]: string }
  areaNames?: { [key: string]: string }
  regionNames?: { [key: string]: string }

  coordinates: ICoordinates

  settlementRadius?: number
}

export interface IVocabulary {
  language: {
    abbr: string
    full: string
  },
  userInterface: {
    header: {
      searchSettlement: {
        placeholder: string
        error: string
        nothing: string
      }
    }
    main: {
      loading: string
      error: string
    }
    dailyForecast: {
      month: string[]
      days: string[]
      categories: IWeatherCategories,
      si: ISI
    }
    footer: {
      aboutProject: {
        title: string
        text: string
        developer: string
      }
      contactMe: {
        title: string
        phone: string
        email: string
      }
      networks: {
        title: string
      }
    }

  }
}

export interface ISI {

  temperature: string
  speed: string
  direction: string[8]
  probability: string
  pressure: string
  distance: string

}

export interface IWeatherCategories {
  sun: {
    title: string
    sunrise: string
    sunset: string
  }
  general: {
    title: string
    clouds: number
    humidity: number
    pressure: number
    dewPoint: number
  }
  precipitation: {
    title: string
    probability: number
    rain: number
    snow: number
  }
  temperature: {
    title: string
    min: number
    max: number
    current: number
    afternoon: number
    evening: number
    morning: number
    night: number
  }
  wind: {
    title: string
    direction: number
    gust: number
    speed: number
  }
  date: {
    title: string
  }
}



//! Дані погоди після обробки
export interface IWeather {
  sun: {
    sunrise: string
    sunset: string
  }
  general: {
    clouds: number
    humidity: number
    pressure: number
    dewPoint: number
  }
  description: {
    allText: string
    icon: string
    main: string
  }
  precipitation: {
    probability: number
    rain: number
    snow: number
  }
  temperature: {
    min: number
    max: number
    real: {
      current: number
      afternoon: number
      evening: number
      morning: number
      night: number
    }
    feelsLike: {
      current: number
      afternoon: number
      evening: number
      morning: number
      night: number
    }
  }
  wind: {
    direction: number
    gust: number
    speed: number
  }
  day: string
  time: string
}

export interface ISettlementsWeather {
  hourly: IWeather[]
  daily: IWeather[]
}
