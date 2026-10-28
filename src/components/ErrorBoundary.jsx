import { Component } from 'react'
import translations from '../translations'

function getMsg() {
  try {
    const lang = localStorage.getItem('zilina-lang')
    return translations[lang]?.about?.errorFallback
      ?? translations.en.about.errorFallback
  } catch {
    return translations.en.about.errorFallback
  }
}

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-content mx-auto px-6 py-24 text-center">
          <p className="text-lg font-bold text-navy">{getMsg()}</p>
        </div>
      )
    }
    return this.props.children
  }
}
