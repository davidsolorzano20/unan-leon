/**
 * By Luis Solorzano
 */

const ipc = require('electron').ipcRenderer
const $ = require('jquery')

ipc.on('unanleon', function () {
  const resp = document.querySelector('a[ng-href="#/website/unanleon.edu.ni"], a[href="#/website/unanleon.edu.ni"]')
  $(resp).click()
})

ipc.on('matricula', function () {
  document.querySelector('a[ng-href="#/website/matricula.unanleon.edu.ni"], a[href="#/website/matricula.unanleon.edu.ni"]').onclick = function () {
    alert('bla bla')
  }
})

ipc.on('componentes', function () {
  const resp = document.querySelector('a[ng-href="#/website/inscripcioncomponentes.unanleon.edu.ni"], a[href="#/website/inscripcioncomponentes.unanleon.edu.ni"]')
  resp.click()
})

ipc.on('compv', function () {
  const resp = document.querySelector('a[ng-href="#/website/www.comp.unanleon.edu.ni-aula"], a[href="#/website/www.comp.unanleon.edu.ni-aula"]')
  resp.click()
})

ipc.on('aulavirtual', function () {
  const resp = document.querySelector('a[ng-href="#/website/aulavirtual.unanleon.edu.ni"], a[href="#/website/aulavirtual.unanleon.edu.ni"]')
  resp.click()
})

ipc.on('becas', function () {
  const resp = document.querySelector('a[ng-href="#/website/solicitudbeca.unanleon.edu.ni"], a[href="#/website/solicitudbeca.unanleon.edu.ni"]')
  resp.click()
})

ipc.on('notas', function () {
  const resp = document.querySelector('a[ng-href="#/website/portalestudiantes.unanleon.edu.ni-consulta_estudiantes.php"], a[href="#/website/portalestudiantes.unanleon.edu.ni-consulta_estudiantes.php"]')
  resp.click()
})

ipc.on('horarios', function () {
  const resp = document.querySelector('a[ng-href="#/website/portalestudiantes.unanleon.edu.ni-horarios"], a[href="#/website/portalestudiantes.unanleon.edu.ni-horarios"]')
  resp.click()
})

