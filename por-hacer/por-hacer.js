const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err)
            throw new Error('No se pudo grabar');
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const getListadoOpcion = (completado) => {
    cargarDB();

    //Recuperamos aquellos registros que nos indique.
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.completado.toString() === completado;
    })

    return nuevoListado;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    //Buscamos la tarea.
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    /*
        //Buscamos la tarea.
        let index = listadoPorHacer.findIndex(tarea => {
            return tarea.descripcion === descripcion;
        });

        if (index >= 0) {
            //La función splice elimina de un array tantos elementos como indiquemos a partir de un índice.
            listadoPorHacer.splice(index, 1);
            guardarDB();
            return true;
        } else {
            return false;
        }
    */

    // SOLUCIÓN CURSO
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    getListadoOpcion,
    actualizar,
    borrar
}