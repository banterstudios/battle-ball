export default class Play {

}

// import { throttle } from '../../../utils/commonUtils'

// const isDev = process.env.NODE_ENV !== 'production'

// export default class Play {
//   constructor () {
//     this.scene = null
//     this.camera = null
//     this.renderer = null
//     this.pointLight = null
//     this.directionalLight = null
//     this.grid = null
//   }

//   init () {
//     this.initialise()
//     this.loadAssets()
//     this.createLights()
//     this.createGrid()
//     this.bindEvents()
//     this.loop()
//   }

//   destroy () {
//     this.cleanUp()
//   }

//   initialise = () => {
//     const { innerWidth, innerHeight } = window

//     this.scene = new THREE.Scene()
//     this.scene.background = new THREE.Color(0x181D21)
//     this.scene.fog = new THREE.FogExp2(0x181D21, 0.1)

//     this.createCamera({ innerWidth, innerHeight })

//     this.renderer = new THREE.WebGLRenderer({ alpha: true, canvas: this.canvasRef.current })
//     this.renderer.setSize(innerWidth, innerHeight)
//   }

//   createCamera = ({ innerWidth, innerHeight }) => {
//     const aspect = innerWidth / innerHeight

//     this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
//     this.camera.position.set(0, 0, 8)
//     this.camera.lookAt(new THREE.Vector3(0, 0, 0))

//     if (isDev) {
//       window.camera = this.camera
//     }
//   }

//   createLights = () => {
//     this.pointLight = new THREE.PointLight(0xFFFFFF, 1, 1000, 50)
//     this.pointLight.position.set(0, 0, 0)
//     this.scene.add(this.pointLight)

//     this.directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)
//     this.directionalLight.position.set(0, 0, 20)
//     this.scene.add(this.directionalLight)

//     if (isDev) {
//       const pointLightHelper = new THREE.PointLightHelper(this.pointLight, 1)
//       this.scene.add(pointLightHelper)
//     }
//   }

//   bindEvents = () => {
//     window.addEventListener('resize', this.handleResize, false)
//   }

//   handleResize = throttle(() => {
//     const { innerWidth, innerHeight } = window

//     this.camera.aspect = innerWidth / innerHeight
//     this.camera.updateProjectionMatrix()
//     this.renderer.setSize(innerWidth, innerHeight)
//   })

//   unBindEvents = () => {
//     window.removeEventListener('resize', this.handleResize, false)
//   }

//   update = () => {}

//   render = () => {
//     this.renderer.render(this.scene, this.camera)
//   }
// }
