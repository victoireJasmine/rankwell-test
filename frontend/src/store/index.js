import {createStore} from "vuex"
import states from "@/store/states"
import mutations from "@/store/mutations"
import actions from "@/store/actions"


export default createStore ({
    states, mutations, actions
})