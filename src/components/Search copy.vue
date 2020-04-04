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
                ...
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
export default {
  //recupere les films depuis l'api db movie
  name: "search",
  data() {
    return {
      query: [],
      results: []
    };
  },
  created() {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=c73e631c2e7e1ae0bb955720c9170cb3&language=fr_FR&sort_by=popularity.desc&page=1&primary_release_date.gte=2020-03-01&primary_release_date.lte=2020-03-31"
      )
      .then(response => {
        this.results = response.data.results;
      });
    console.log(this.results);
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