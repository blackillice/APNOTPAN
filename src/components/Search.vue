<template>
  <div class="search">
    <h1>Film en Salle :</h1>
    <div class="container col-12">
      <div class="film col-3" v-for="result in results" :key="result.id">
        <p>{{result.title}}</p>
        <div class="imgsize">
          <img v-bind:src="'http://image.tmdb.org/t/p/w500/' +    result.poster_path" />
          <div>
            <span class="espace"></span>
          </div>
          <button class="button" type="button" data-toggle="modal" :data-target="'#modal_' + result.id" >J'ai vu ce film</button>
          <div>
            <span class="espace"></span>
          </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" :id="'modal_'+result.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">{{result.title}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                
                <div>
                  <b-form @submit="onSubmit" @reset="onReset" >

                    <input type="text" name="form.id"  readonly :value="result.id">
                    
                    
                    

                    <b-form-group id="input-group-1" label="Adresse Mail:" label-for="input-1" description="Pour des raisons de sécurité evitez de partagez votre adresse mail avec les autres utilisateurs">
                      <b-form-input
                        id="input-1"
                        v-model="form.email"
                        type="email"
                        required
                        placeholder="Entrez votre email"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Votre Nom:" label-for="input-2">
                      <b-form-input
                        id="input-2"
                        v-model="form.name"
                        required
                        placeholder="Entrez votre nom"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="note" label-for="input-3">
                    <b-form-select
                      id="input-3"
                      v-model="form.note"
                      class="mb-2 mr-sm-2 mb-sm-0"
                      :options="[ 'Mediocre(1/5)', 'Peu intéréssant(2/5)', 'Bon(3/5)','Tres bon(4/5)','Culte(5/5)']"
                      required
                      placeholder="Entrez une note"
                      :value="null"
                    ></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-4" label="Critique" label-for="input-4">
                      <b-form-textarea
                        :rows="3"
                        id="input-4"
                        v-model="form.critique"
                        required
                        placeholder="Entrez votre Critique"
                      ></b-form-textarea>
                    </b-form-group>

                    <b-button type="submit" v-on:click="onyoloaxe(result.id,result.title)" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="danger">Reset</b-button>
                  </b-form>
                  <b-card class="mt-3" header="Form Data Result">
                    <pre class="m-0">{{ form }}</pre>
                  </b-card>
                </div>


              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {db} from '../db';

export default {
  //recupere les films depuis l'api db movie via query
  name: "search",
  data() {
    return {
      results: [],
      form: {
        titre:'',
        email: '',
        name: '',
        note:'',
        critique:'',
        id:''
      },
      show: true
    }
  },

  methods: {
    onyoloaxe(idfilm,titlefilm){
      console.log(idfilm)
      this.form.id = idfilm ;
      this.form.titre = titlefilm;
    
    },
    onSubmit(evt) {
      evt.preventDefault()
      var gaetan = this.form;
      this.form.email = this.form.email.replace(".","");
      this.form.titre = this.form.titre.replace(".","");
      alert(JSON.stringify(gaetan))
      console.log(gaetan)
      db.ref('Film:'+(this.form.titre) + ' '+ (this.form.id)+'/'+(""+this.form.email)+'/')
            .set(gaetan)
            .then(() => {
            console.log('form send')
        })
      
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.note = null
      this.form.critique = ''
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = true
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
  
  created() {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=c73e631c2e7e1ae0bb955720c9170cb3&language=fr_FR&sort_by=popularity.desc&page=1&primary_release_date.gte=2020-03-01&primary_release_date.lte=2020-03-31"
      )
      .then(response => {
       this.results = response.data.results;
       console.log(JSON.stringify(this.results[0]));
      });

  }
};





</script>
<style>
body,
html {
  height: 100%;
  width: 100%;
}
p {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 20px;
}
h1 {
  font-size: 50px;
}
.film {
  display: inline-block;
  padding-bottom: 30px;
  padding-top: 130px;
}
.imgsize {
  width: 440px;
  height: 620px;
}
.imgsize img {
  width: 100%;
  height: 100%;
}
.button {
  background-color: #e81e13;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.espace {
  padding-bottom: 1130px;
  padding-top: 1130px;
  margin: 4px 2px;
}
</style>