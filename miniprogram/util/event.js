class Event {
  eventPool = {}

  emit(type, ctx, ...args) {
    this.eventPool[type].forEach(item => item.apply(ctx, args))
  }
  off(type, fn) {
    if (fn) {
      let index = this.eventPool[type].indexOf(fn)
      while (index > -1) {
        delete this.eventPool[type][index]
        index = this.eventPool[type].indexOf(fn, index)
      }
      return 
    }
    delete this.eventPool[type]
  }

  on(type, fn) {
    (this.eventPool[type] = this.eventPool[type] || []).push(fn)
  }
}

export default Event