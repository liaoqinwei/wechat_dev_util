class Event {
  eventLoop = {}

  emit(type, ctx, ...args) {
    this.eventLoop[type].forEach(item => item.apply(ctx, args))
  }
  off(type, fn) {
    if (fn) {
      let index = this.eventLoop[type].indexOf(fn)
      while (index > -1) {
        delete this.eventLoop[type][index]
        index = this.eventLoop[type].indexOf(fn, index)
      }
      return 
    }
    delete this.eventLoop[type]
  }

  on(type, fn) {
    (this.eventLoop[type] = this.eventLoop[type] || []).push(fn)
  }
}

export default Event