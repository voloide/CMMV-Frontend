<template>
    <q-item clickable v-ripple>
        <!--q-item-section avatar top>
            <q-item-label>{{appointment && this.formatDateShort(appointment.appointmentDate)}}</q-item-label>
            <q-item-label caption>2 days ago</q-item-label>
        </q-item-section-->
        <q-item-section>
            <q-item-label>[&nbsp;{{appointment && this.formatDateShort(appointment.appointmentDate)}} - {{appointment && appointment.time}}&nbsp;]</q-item-label>
            <q-item-label caption> <span >Utente: {{appointment.utente && appointment.utente.firstNames}}
            <span >  &nbsp; &nbsp; &nbsp; Codigo: {{appointment.utente && appointment.utente.systemNumber}}</span> </span></q-item-label>
        </q-item-section>
        <q-item-section side>
            <div class="row q-gutter-xs justify-end">
                <q-btn size="sm" outline color="primary" label="Confirmar" @click.stop="promptToConfirm(appointment)"/>
                <q-btn size="sm" outline color="primary" label="Re-marcar" @click="showReshedule = true"/>
            </div>
        </q-item-section>
        <q-dialog v-model="showReshedule">
          <resheduleApp :appointment="appointment" @close="showReshedule = false" />
        </q-dialog>
    </q-item>
</template>

<script>
import Appointment from '../../store/models/appointment/Appointment'
import { date } from 'quasar'
export default {
    props: ['appointment', 'utenteDb'],
    emits: ['update:appointment'],
    data () {
        return {
            showReshedule: false
        }
    },
    methods: {
        formatDateShort (value) {
            return date.formatDate(value, 'DD/MM/YYYY')
        },
        getDaysPassed () {
            return ''
        },
        promptToConfirm (appointmentToConfirm) {
            this.$q.dialog({ title: 'Confirm', message: 'Deseja Confirmar?', cancel: true, persistent: true }).onOk(() => {
            appointmentToConfirm.status = 'CONFIRMADO'
            console.log(appointmentToConfirm)
            Appointment.api().patch('/appointment/' + appointmentToConfirm.id, appointmentToConfirm).then(resp => {
                console.log(resp.response.data)
                this.$emit('appointmentConfirm', resp.response.data)
            }).catch(error => {
                console.log(error)
            })
        })
      }
    },
    components: {
        resheduleApp: require('components/Clinic/ResheduleAppoinment.vue').default
    }
}
</script>

<style>

</style>
