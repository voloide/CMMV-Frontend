<template>
  <transition-group
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutLeft absolute-top"
        >
        <q-slide-item @left="$emit('previousScreen')" left-color="white">
            <template v-slot:left>
            <q-icon name="reply" />
            </template>
            <q-item>
                <div key="seventhScreen" class="q-gutter-md row items-start">
                    <img src="~src/assets/07Escolha.png"
                        style="height: auto; max-width: 100%">
                    <div class="row q-pa-md">
                        <q-btn flat round color="primary" icon="west" @click="$emit('previousScreen')"/>
                    </div>
                    <page-content
                        title="Faça uma escolha consciente"
                        content="A circuncisão médica é gratuita, segura e rápida; "
                        content1="Passe a palavra ao seu irmão/amigo/vizinho/parente,  com 15 à  49 anos de  idade."
                        />
                </div>
            </q-item>
        </q-slide-item>
        <div class="absolute-bottom q-px-lg q-mb-lg">
            <div class="text-center q-mb-md">
                <q-btn disabled class="full-width q-py-xs" unelevated rounded color="primary" label="Registar" @click="$emit('nextScreen')" />
            </div>
            <div class="text-center">
                <q-btn class="full-width q-py-xs" unelevated rounded color="primary" label="Entrar" @click="$emit('login')"/>
            </div>
        </div>
        <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
        >
        <seventh-screen-instruction/>
        </transition>

  </transition-group>
</template>

<script>
export default {
    components: {
        'seventh-screen-instruction': require('components/UserInstructions/SeventhMainScreenInstruction.vue').default,
        'page-content': require('components/MainScreen/Content.vue').default
    },
    methods: {}
}
</script>

<style>

</style>
