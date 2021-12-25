AFRAME.registerComponent("cursor_event_listener", {
    schema: { selected_item_id: { default: '', type: "string" } ,
},

    init: function () {
        this.handle_mouse_enter_events()
        this.handle_mouse_leave_events()
        this.handle_click_events()
    },

    handle_places_list: function () {
        const id = this.el.getAttribute("id")
        const places_id = ["budapest", "eiffel-tower", "new-york-city", "taj-mahal"]
        if (places_id.includes(id)) {
            const place_container = document.querySelector("#places")
            place_container.setAttribute("cursor_event_listener", { selected_item_id: id })
            this.el.setAttribute("material", {
                color: "blue",
                opacity: 1,
            })
        }
    },

    handle_mouse_enter_events: function () {
        this.el.addEventListener("mouseenter", () => {
            this.handle_places_list()
        })
    },

    handle_mouse_leave_events:function(){
        this.el.addEventListener("mouseleave",()=>{
            const {selected_item_id}=this.data;
            if(selected_item_id){
                const el=document.querySelector(`#${selected_item_id}`)
                const id=el.getAttribute("id")
                if(id==selected_item_id){
                    el.setAttribute("material",{
                        color:"red",
                        opacity:1,
                    })
                }
            }
        })
    },

    handle_click_events:function(){
        this.el.addEventListener('click',e=>{
            const place_container=document.querySelector("#places")
            const {state}=place_container.getAttribute('tour')
            if(state=='places_list'){
                const id=this.el.getAttribute('id')
                const places_id = ["budapest", "eiffel-tower", "new-york-city", "taj-mahal"]
                if(places_id.includes(id)){
                    place_container.setAttribute('tour',{state:'view',selected_card:id})
                }
            }
        })
    },

})