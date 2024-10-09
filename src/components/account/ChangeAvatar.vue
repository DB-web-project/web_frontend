<template>
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="oldEmail"
            v-model="oldEmail"
            :rules="[() => !!oldEmail || '这是必填项']"
            :error-messages="errorMessages"
            label="你的旧电子邮箱"
            placeholder="请输入你的旧邮箱"
            required
          ></v-text-field>
          
          <v-text-field
            ref="newEmail"
            v-model="newEmail"
            :rules="[
              () => !!newEmail || '这是必填项',
              () => !!newEmail && oldEmail !== newEmail || '新旧电子邮箱一致'
            ]"
            label="你的新电子邮箱"
            placeholder="请输入你的新邮箱"
            required
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-6"></v-divider>
        <v-card-actions>
          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="my-0"
                  v-bind="attrs"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>重置输入</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn
            color="primary"
            class="mr-4"
            @click="submit"
          >
            提交
          </v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
  export default {
    name: "ChangeEmail",
    data: () => ({
      errorMessages: '',
      newEmail: null,
      oldEmail: null,
      formHasErrors: false,
    }),

    computed: {
      form () {
        return {
          newEmail: this.newEmail,
          oldEmail: this.oldEmail
        }
      },
    },

    watch: {
      oldEmail () {
        this.errorMessages = ''
      },
    },

    methods: {
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true
          this.$refs[f].validate(true)
        })
      },
    },
  }
</script>

<style>

</style>