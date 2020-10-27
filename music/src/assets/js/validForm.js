import Vue from 'vue';
import {Notify} from 'vant';

Vue.use(Notify)

class ValidForm {
    valid(o) {
        for(let k in o) {
            if(!o[k].reg.test(o[k].value)){
                Notify({
                    type:'warning',
                    message:o[k].errorMsg
                })
                return false;
            }
        }
        return true;
    }
}

export const validForm = new ValidForm()