<template>
  <div>
    <div class="logos">
        <center>
            <img src="../assets/logo.png" class="vlogo">
            <img src="../assets/twitter.png" class="vlogo">
        </center>
    </div>
    
    <h4 class="text-center">{{msg}}</h4> 
    <br>
    <div class="row">
        <div class="col-md-4 col-md-offset-4 col-sm-12 col-xs-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title text-center">
                        Compose new Tweet
                    </h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-10 col-md-offset-1 col-sm-12 col-xs-12">                           
                            <div class="row">
                                <textarea class="form-control" required rows="4" v-model="tweet">
                                </textarea>
                            </div>
                            <br>
                            <div class="row" v-if="photoHasBeenUploaded">
                                <div class="col-md-4" v-for="(photo, $index) in photos" :key="$index">
                                    <button type="button" class="btn btn-xs btn-danger pull-right" @click="removePhoto( $index)"><i class="fa fa-close"></i></button>
                                    <img v-bind:src="photo" class="img-responsive">
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <input type="file" ref="photoUpload" @change="handlePhotoUpload" class="hide" multiple>
                                <button type="button" @click="triggerFileUpload" class="btn btn-sm btn-success ticon">
                                    <i class="fa fa-camera fa-lg"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-success ticon">
                                    <i class="fa fa-line-chart fa-lg"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-success ticon">
                                    <i class="fa fa-map-marker fa-lg"></i>
                                </button>
                                <div class="pull-right">
                                    <span v-bind:class="{ 'text-info': underTwentyMark, 'text-danger': underTenMark }">{{charactersRemaining}} </span> <button class="btn btn-success btn-sm" type="button" :disabled="tweetIsOutOfRange"><i class="fa fa-pencil-square"></i> Tweet</button>
                                </div>
                            </div>                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>   
  </div>
</template>

<script>
const MAX_TWEET_LENGTH = 140
// import Navbar from '@/components/navbar/navbar'

export default {
  name: 'Tweet',
  data () {
    return {
      msg: 'Welcome to Vue.js Tweet App',
      tweet: '',
      photos: [],
      title: 'Tweet App',
      menuStyle: true,
      icon: '<i class="fa fa-twitter fa-lg"></i>',
      Menus: [{ 'name': 'chart App', 'route': 'npm-charts' }, { 'name': 'To do App', 'route': 'to_do' }]
    }
  },
  computed: {
    tweetIsOutOfRange: function () {
      return this.charactersRemaining === MAX_TWEET_LENGTH || this.charactersRemaining < 0
    },
    charactersRemaining: function () {
      return MAX_TWEET_LENGTH - this.tweet.length
    },
    underTwentyMark: function () {
      return this.charactersRemaining <= 20 && this.charactersRemaining > 10
    },
    underTenMark: function () {
      return this.charactersRemaining <= 10
    },
    photoHasBeenUploaded: function () {
      return this.photos.length > 0
    }
  },
  methods: {
    triggerFileUpload: function () {
      this.$refs.photoUpload.click()
    },
    handlePhotoUpload: function (e) {
      var self = this
      var files = e.target.files
      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader()
        reader.onloadend = function (evt) {
          self.photos.push(evt.target.result)
        }
        reader.readAsDataURL(files[i])
      }
    },
    removePhoto: function (index) {
      this.photos.splice(index, 1)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .ticon{
        margin-right: 15px;
    }
</style>
