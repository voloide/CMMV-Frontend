<template>
    <div>
        <div class="row q-py-lg q-mt-md text-weight-bold text-subtitle1">
            Hoje, {{this.formatDateDDMMMYYYY(new Date())}}
        </div>
        <div class="">
            <q-toolbar >
                <q-tabs v-model="tab" shrink stretch>
                    <q-tab name="ConsultasDay" label="Consultas do dia" />
                    <q-tab name="ConsultasOther" label="Outras Consultas" />
                    <q-tab name="ConsultasDone" label="Consultas Realizadas" />
                </q-tabs>
            </q-toolbar>
            <q-separator class="q-mx-md"/>

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="ConsultasDay">
                  <clinic-appointments-table  :rows="getAppointmentsToday" :columns="columns" :updateClinicAppoitment="updateClinicAppoitment"/>
                </q-tab-panel>
                <q-tab-panel name="ConsultasOther">
                   <clinic-appointments-table  :rows="appointmentsBDD" :columns="columns" :updateClinicAppoitment="updateClinicAppoitment"/>
                </q-tab-panel>
                <q-tab-panel name="ConsultasDone">
                  <clinic-appointments-table  :rows="appointmentsDone" :columns="columns2" :updateClinicAppoitment="updateClinicAppoitment"/>
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </div>
</template>
<script>
import { date, useQuasar } from 'quasar'
import { ref } from 'vue'
import Appointment from '../../store/models/appointment/Appointment'

const columns = [
  { name: 'appointmentDate', required: true, label: 'Data', align: 'left', field: row => row.appointmentDate, format: val => `${val}`, sortable: true },
  { name: 'time', required: true, label: 'Hora', align: 'left', field: row => row.time, format: val => `${val}`, sortable: true },
  { name: 'code', required: true, label: 'Codigo', align: 'left', field: row => row.utente !== undefined && row.utente !== null ? row.utente.code : 'Não Definido', format: val => `${val}`, sortable: true },
  { name: 'nameUser', required: true, label: 'Nome do Utente', align: 'left', field: row => row.utente !== null ? row.utente.firstNames + ' ' + row.utente.lastNames : ' ', format: val => `${val}`, sortable: true },
  { name: 'hasHappened', required: true, label: 'Chegou?', align: 'left', field: row => row.hasHappened ? ' Sim' : 'Não', format: val => `${val}`, sortable: true }
]
const columns2 = [
  { name: 'visitDate', required: true, label: 'Data da Visita', align: 'left', field: row => row.visitDate, format: val => `${val}`, sortable: true },
  { name: 'time', required: true, label: 'Hora', align: 'left', field: row => row.time, format: val => `${val}`, sortable: true },
  { name: 'code', required: true, label: 'Codigo', align: 'left', field: row => row.utente !== undefined && row.utente !== null ? row.utente.code : 'Não Definido', format: val => `${val}`, sortable: true },
  { name: 'nameUser', required: true, label: 'Nome do Utente', align: 'left', field: row => row.utente !== null ? row.utente.firstNames + ' ' + row.utente.lastNames : ' ', format: val => `${val}`, sortable: true },
  { name: 'hasHappened', required: true, label: 'Chegou?', align: 'left', field: row => row.hasHappened ? ' Sim' : 'Não', format: val => `${val}`, sortable: true }
]
export default {
  data () {
    const $q = useQuasar()

    return {
        columns,
        columns2,
        $q,
        tab: ref('ConsultasDay')
    }
  },
 computed: {
      getAppointmentsToday () {
          return Appointment.query()
                           .with('utente')
                           .with('clinic')
                           .with('utente.address')
                           .with('utente.clinic')
                           .where((appointment) => {
                                  return appointment.status === 'CONFIRMADO' &&
                                  appointment.hasHappened === false &&
                                  appointment.appointmentDate !== '' &&
                                  appointment.appointmentDate !== null &&
                                  appointment.appointmentDate !== undefined &&
                                  ((new Date(appointment.appointmentDate)).getTime() === new Date().getTime()) &&
                                  appointment.clinic_id === Number(localStorage.getItem('id_clinicUser'))
                                  })
                          .orderBy('appointmentDate', 'desc')
                          .get()
      },
      appointmentsBDD () {
          return Appointment.query()
                           .with('utente')
                           .with('clinic')
                           .with('utente.address')
                           .with('utente.clinic')
                           .where((appointment) => {
                                  return appointment.status === 'CONFIRMADO' &&
                                  appointment.hasHappened === false &&
                                  (appointment.visitDate === null || appointment.visitDate === '' || appointment.visitDate === undefined) &&
                                  appointment.appointmentDate !== '' &&
                                  appointment.appointmentDate !== null &&
                                  appointment.appointmentDate !== undefined &&
                                  ((new Date(appointment.appointmentDate)).getTime() < new Date().getTime()) &&
                                  appointment.clinic_id === Number(localStorage.getItem('id_clinicUser'))
                                  })
                          .orderBy('appointmentDate', 'desc')
                          .get()
      },
      appointmentsDone () {
          return Appointment.query()
                           .with('utente')
                           .with('clinic')
                           .with('utente.address')
                           .with('utente.clinic')
                           .where((appointment) => {
                                  return appointment.status === 'CONFIRMADO' &&
                                  appointment.visitDate !== '' &&
                                  appointment.visitDate !== null &&
                                  appointment.visitDate !== undefined &&
                                  appointment.clinic_id === Number(localStorage.getItem('id_clinicUser'))
                                  })
                          .orderBy('appointmentDate', 'desc')
                          .get()
      }
  },
  methods: {
    getAppointments () {
          Appointment.api().get('/appointment')
       },
    updateClinicAppoitment (appointment) {
      Appointment.api().patch('/appointment/' + appointment.id, appointment).then(resp => {
        this.$q.notify({
              message: 'Consulta do paciente foi actualizada.',
              color: 'teal'
          })
      }).catch(error => {
        console.log('Erro no code ' + error)
        })
        Appointment.update(appointment)
    },
    formatDate (value) {
        return date.formatDate(value, 'YYYY/MM/DD')
    },
    formatDateDDMMMYYYY (value) {
        return date.formatDate(value, 'DD MMM YYYY')
    }
  },
  mounted () {
    this.getAppointments()
  },
  components: {
    'clinic-appointments-table': require('components/Clinic/ClinicAppointmentsTable.vue').default
  }
}
</script>
