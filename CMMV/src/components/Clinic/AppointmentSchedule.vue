<template>
  <transition-group
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut absolute-top">

        <div key="app-to-accept">
            <UserMessage />
            <div class="row q-mt-md text-bold">
                Marcação de Consultas ({{appointmentsPending.length}})
            </div>
            <q-list
                bordered
                separator
                class="rounded-borders q-mt-md"
                 v-for="appointment in appointmentsPending"
                :key="appointment.id" >
                <PendingApp :appointment="appointment" />
            </q-list>
            <div class="row q-mt-lg text-bold">
                Consultas Marcadas ({{appointmentsConfirmed.length}})
            </div>
            <q-list
                bordered
                separator
                class="rounded-borders q-mt-md"
                 v-for="appointment in appointmentsConfirmed"
                :key="appointment.id" >
                <AcceptedApp :appointment="appointment"/>
            </q-list>
        </div>
    </transition-group>
</template>

<script>
import { date } from 'quasar'
import Appointment from '../../store/models/appointment/Appointment'
import Utente from '../../store/models/utente/Utente'
import Clinic from '../../store/models/clinic/Clinic'
export default {
  data () {
    return {
         appointmentsBD: [],
      showEdit: false
      }
  },
 computed: {
        appointmentsPending () {
         return Appointment.query()
                           .with('utente')
                           .with('clinic')
                           .with('utente.address')
                           .with('utente.clinic')
                           .where((appointment) => {
                                  return appointment.status === 'PENDENTE' && appointment.appointmentDate !== '' && appointment.clinic_id === Number(localStorage.getItem('id_clinicUser'))
                                  })
                          .orderBy('appointmentDate', 'desc')
                          .get()
      },
      appointmentsConfirmed () {
         return Appointment.query()
                           .with('utente')
                           .with('clinic')
                           .with('utente.address')
                           .with('utente.clinic')
                           .where((appointment) => { return appointment.status === 'CONFIRMADO' && !appointment.hasHappened && appointment.appointmentDate !== '' && appointment.clinic_id === Number(localStorage.getItem('id_clinicUser')) })
                           .orderBy('appointmentDate', 'desc')
                           .get()
      },
        UtenteBD () {
         return Utente.all()
      },
        clinicDB () {
         return Clinic.find(localStorage.getItem('id_clinicUser'))
      }
  },
    methods: {
  async getAppointments () {
       // Buscar as consults pelo id da clinica logada
    await Appointment.api().get('/appointment/clinic/' + localStorage.getItem('id_clinicUser')).then(resp => {
          }).catch(error => {
          console.log('Erro no code ' + error)
        })
          // Utente.api().get('/utente')
       },
      handlerEdit () {
        this.showEdit = true
      },
       formatDate (value) {
            return date.formatDate(value, 'YYYY/MM/DD')
        }
       },
       mounted () {
         this.getAppointments()
       //  this.fillUtenteOnAppointment()
    },
    components: {
      // reschedule: require('pages/Reschedule.vue').default,
        PendingApp: require('components/Clinic/PendingAppointment.vue').default,
        UserMessage: require('components/Clinic/UserMessage.vue').default,
        AcceptedApp: require('components/Clinic/AcceptedAppointment.vue').default
       }
}
</script>

