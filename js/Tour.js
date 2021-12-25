AFRAME.registerComponent("tour", {
    schema: {
        state: { type: 'string', default: 'places_list' },
        selected_card: { type: 'string', default: '#card1' },
    },
    init: function () {
        this.places = this.el;
        this.create_cards()

    },

    // update: function () {
    //     window.addEventListener("keydown", e => {
    //         if (e.key === "ArrowUp") {
    //             if (
    //                 (this.data.zoomAspectRatio <= 10 && this.data.state === "view") ||
    //                 (this.data.zoomAspectRatio <= 10 && this.data.state === "change-view")
    //             ) {
    //                 this.data.zoomAspectRatio += 0.002;
    //                 this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
    //             }
    //         }
    //         if (e.key === "ArrowDown") {
    //             if (
    //                 (this.data.zoomAspectRatio > 1 && this.data.state === "view") ||
    //                 (this.data.zoomAspectRatio > 1 && this.data.state === "change-view")
    //             ) {
    //                 this.data.zoomAspectRatio -= 0.002;
    //                 this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
    //             }
    //         }
    //     });
    // },

    tick: function () {
        const { state } = this.el.getAttribute('tour')
        if (state == "view") {
            this.hide_elements([this.places])
            this.show_view()
        }
    },

    create_cards: function () {
        const thumbnail_ref = [{
            id: "taj-mahal",
            title: "Taj Mahal",
            url: "./assets/thumbnails/taj_mahal.png",
        },
        {
            id: "new-york-city",
            title: "New York City",
            url: "./assets/thumbnails/new_york_city.png",
        },
        {
            id: "eiffel-tower",
            title: "Eiffle Tower",
            url: "./assets/thumbnails/eiffel_tower.jpg",
        },
        {
            id: "budapest",
            title: "Budapest",
            url: "./assets/thumbnails/budapest.jpg",
        },
        ]

        let prev_x_pos = -60;
        for (var item of thumbnail_ref) {
            const pos_x = prev_x_pos + 25
            const pos_y = 10
            const pos_z = -40
            const pos = { x: pos_x, y: pos_y, z: pos_z }
            prev_x_pos = pos_x

            const border_el = this.create_border(item.id, pos)
            const thumbnail_el = this.create_thumbnail(item)
            border_el.appendChild(thumbnail_el)
            const title_el = this.create_title(pos, item)
            border_el.appendChild(title_el)
            this.places.appendChild(border_el)
        }
    },

    create_border: function (id, position) {
        const entity_el = document.createElement("a-entity")
        entity_el.setAttribute("id", id)
        entity_el.setAttribute("position", position)
        entity_el.setAttribute("visible", true)
        entity_el.setAttribute("geometry", {
            primitive: "ring",
            radiusInner: 9,
            radiusOuter: 10
        })
        entity_el.setAttribute("material", {
            color: "red",
            opacity: 1,
        })

        entity_el.setAttribute("cursor_event_listener", {})
        return entity_el
    },
    create_thumbnail: function (item) {
        const entity_el = document.createElement("a-entity")
        entity_el.setAttribute("visible", true)
        entity_el.setAttribute("geometry", {
            radius: 9,
            primitive: "circle",
        })
        entity_el.setAttribute("material", {
            src: item.url,
        })
        return entity_el
    },

    create_title: function (position, item) {
        const entity_el = document.createElement("a-entity")
        entity_el.setAttribute("text", {
            value: item.title,
            font: "exo2bold",
            align: "center",
            color: "black",
            width: 60,
        })
        const text_pos = position
        text_pos.y = -20
        entity_el.setAttribute("position", text_pos)
        entity_el.setAttribute("visible", true)
        return entity_el
    },

    hide_elements: function (element_list) {
        element_list.map(el => {
            el.setAttribute('visible', false)
        })
    },

    show_view: function () {
        const { selected_card } = this.data;
        const sky_container = document.querySelector("#main-container")
        sky_container.setAttribute("material", {
            src: `./assets/360_images/${selected_card}/place-0.jpg`,
            color: "white",
        })
    },


})