// AOS.init()
var app = Vue.createApp({

  data() {
    return {
      lang: "eng",
      font: 'pop',
      groups: '',
      currentGroup: 'Some of our products',
      profile: "",
      spinner: false,
      api:'https://script.google.com/macros/s/AKfycbwcF3gwDmorLdur79FHRvrBi1d9W1eYvTmXrPodF5wfkKnfjoahXrD05hNr6fre4j3j1Q/exec'
    };
  },
  methods: {
    filterGroup(gname) {
      this.groups = this.profile.services.filter(g => {
        return g.group == gname
      })
      this.currentGroup = gname
    },

    trancate(text, size) {
      // it trancate n number of words
      // var n = 20
      // var text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non neque nesciunt et. Exercitationem quam corrupti officia expedita aspernatur eveniet fugiat repudiandae quos? Harum omnis molestias eos quia, in illum incidunt exercitationem, enim possimus quasi laboriosam ut! Alias provident consequatur dicta.'
      // console.log(text.split(' ',20))
      if (text.length < size) return text += ' . . . '
      else {

        var words = text.split(' ', size)
        var trancatedText = ''
        words.forEach(word => {
          trancatedText += word + ' '
        })
        // trancatedText += ' ...'
        // console.log(trancatedText)
        return trancatedText
      }
    },
    toggleLanguage(lang) {
      this.spinner = true
      this.lang = lang
      if (lang == 'esp') { this.currentGroup = 'Algunos de nuestros productos' }
      if (lang == 'eng') { this.currentGroup = 'Some of our products' }

      fetch(this.api).then(res => res.json()).then(res => {
        // console.log(res)
        this.profile = res
        this.spinner = false

        this.initTarjama(res)
      })
    },

    isArabic(text) {
      var pattern = /[\u0600-\u06FF\u0750-\u077F]/;
      result = pattern.test(text);
      return result;
    },
    isEng(text) {

      // var pattern = /[A-z]/gi;
      // result = pattern.test(text);
      result = text.includes('eng=')
      return result;
    },
    isEsp(text) {

      // var pattern = /[\u0400-\u04FF]/gi;
      result = text.includes('esp=')
      return result;
    },
    initTarjama(res) {

      this.profile.heading = this.tarjem(res.heading)
      this.profile.tagLine = this.tarjem(res.tagLine)
      this.profile.bio = this.tarjem(res.bio)
      // this.profile.overview = this.tarjem(res.overview)

      // SERVICES
      this.profile.services.forEach(e => {
        e.title = this.tarjem(e.title)
        e.description = this.tarjem(e.description)
        e.varieties = this.tarjem(e.varieties)
        e.schedule = this.tarjem(e.schedule)
        e.brand = this.tarjem(e.brand)
        e.packaging = this.tarjem(e.packaging)
        e.format = this.tarjem(e.format)
        e.caliber = this.tarjem(e.caliber)
        e.origin = this.tarjem(e.origin)
        e.delivery = this.tarjem(e.delivery)
        e.price = this.tarjem(e.price)
      });
      // FAQ
      this.profile.faq.forEach(e => {
        e.question = this.tarjem(e.question)
        e.answer = this.tarjem(e.answer)
      });
      // Media
      // this.profile.tabs.forEach(tab => {
      //     this.profile.media[tab].forEach(e => {

      //         e.title = this.tarjem(res.title)
      //         e.description = this.tarjem(res.description)
      //     })
      // });
      
      this.groups = this.profile.services.filter(g => {
        return g.index <= '8'
      })

    },
    tarjem(text) {
      var lang = this.lang
      var res;
      // var lang = 'arb'
      // console.log('tarjem')
      // var text = `привет e ;; hello world ;; e السلام عليكم `
      if (lang == 'esp') {
        var demo = text.split(';;')
        demo.forEach(e => {
          if (this.isEsp(e)) res = e.replace('esp=','')
        })
      } else {
        if (lang == 'eng') {

          var demo = text.split(';;')
          demo.forEach(e => {
            // console.log(e.replace('eng=',''))
            if (this.isEng(e)) res = e.replace('eng=','')
          })
        }
      }
      return res
    },
  },
  mounted() {
    AOS.init()
    this.spinner = true;
    var api = this.api + "?getProfile=1";
    fetch(api)
      .then((res) => res.json())
      .then((res) => {
        this.profile = res;
        console.log(this.profile);
        this.groups = this.profile.services.filter(g => {
          return g.index <= '8'
        })
        this.spinner = false;
        
        this.initTarjama(res)
      });
  },

})


app.component('faq-section', {
  template:
    /*html */
    `
      <section id="faq" class="faq">
      <div class="container" data-aos="fade-up">
  
        <div class="section-title">
          <h2>Your one-stop shop for digital solutions FAQs</h2>
          <p>We understand that navigating the digital landscape can be overwhelming, which is why we've created a
            comprehensive FAQ page to provide answers to all of your digital questions. From website development to
            digital marketing, our FAQs cover a wide range of topics to help you better understand the services we offer
            and how they can benefit your business. If you don't find the answer to your question here, don't hesitate
            to reach out to us directly. We're always happy to help</p>
        </div>
  
        <div class="faq-list">
          <ul>
            <li data-aos="fade-up" data-aos="fade-up" data-aos-delay="100">
              <i class="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" class="collapse"
                data-bs-target="#faq-list-1">What kind of services do you offer? <i
                  class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
              <div id="faq-list-1" class="collapse show" data-bs-parent=".faq-list">
                <p>
                  We offer a wide range of digital solutions, including website development, digital marketing, and
                  more.
                </p>
              </div>
            </li>
  
            <li data-aos="fade-up" data-aos-delay="200">
              <i class="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-2"
                class="collapsed">How can your services help my business? <i class="bx bx-chevron-down icon-show"></i><i
                  class="bx bx-chevron-up icon-close"></i></a>
              <div id="faq-list-2" class="collapse" data-bs-parent=".faq-list">
                <p>Our services can help your business by giving you the tools you need to succeed in the digital age.
                  We can help you create a professional website, improve your online presence, and reach new customers
                  through targeted digital marketing campaigns.
                </p>
              </div>
            </li>
  
            <li data-aos="fade-up" data-aos-delay="300">
              <i class="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-3"
                class="collapsed">What sets your company apart from others? <i
                  class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
              <div id="faq-list-3" class="collapse" data-bs-parent=".faq-list">
                <p>
                  We are dedicated to helping businesses of all sizes navigate the ever-changing digital landscape. Our
                  team of experts is committed to providing innovative solutions and excellent customer service to
                  ensure that your business reaches its full potential.
                </p>
              </div>
            </li>
  
  
          </ul>
        </div>
  
      </div>
    </section>
      `,
})


app.mount('#app')

