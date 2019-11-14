# EletroStore-Web
Web pages developed in Vue.JS

#Download application and run
cd eletrostore-web
npm install
npm run serve

#Plus (Step by Step of all commands executed for the Frontend)
npm install jquery
sudo npm install -g @vue/cli
vue create eletrostore-web
cd eletrostore-web
npm run serve
Ctrol+C

After application running
npm add axios
npm add vue-router
npm install bootstrap-vue bootstrap moment

Added this dependency for images
npm install --save vue-image-upload-resize

Add another port in the package.json, under "scripts" 
	"serve": "vue-cli-service serve --port 8081"
	
npm cache clean --force
npm install
npm run serve