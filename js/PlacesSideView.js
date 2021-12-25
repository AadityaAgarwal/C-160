AFRAME.registerComponent('helicopter', {
    tick: function () {
        const places = document.querySelector('places')
        const { state } = places.getAttribute('tour')
        if (state == "view") {
            this.el.setAttribute('visible', true)
        }
        else this.el.setAttribute('visible', false)
    },

    init: function () { this.createHelicopterPos() },

    createHelicopters: function (pos, id) {
        const entityEl = document.createElement('a-entity')
        entityEl.setAttribute('visible', true)
        entityEl.setAttribute('id', `place-${id}`)
        entityEl.setAttribute('geometry', {
            primitive: 'circle',
            radius: 2,
        })
        entityEl.setAttribute('material', {
            src: './assets/helicopter.png',
            opacity: 1
        })
        entityEl.setAttribute('position', pos)
        entityEl.setAttribute('cursor_event_listener', {})
        return entityEl
    },

    createHelicopterPos: function () {
        const sideView = document.querySelector('#helicopter')
        let prevPos_X = -150
        let prevPos_Y = 30

        for (var i = 1; i <= 4; i++) {

            const pos = { x: (prevPos_X += 50), y: (prevPos_Y += 2), z: -40 }
            const entityEl = this.createHelicopters(pos, i)
            sideView.appendChild(entityEl)
        }
    },

})