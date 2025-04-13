const fs = require('fs');

// Función para crear una nueva nota
function crearNota(titulo, contenido) {
  let notas = [];

  if (fs.existsSync('notas.json')) {
    const datos = fs.readFileSync('notas.json', 'utf8');
    notas = JSON.parse(datos);
  }

  const notaExistente = notas.find(nota => nota.titulo === titulo);
  if (notaExistente) {
    console.log('⚠️ Ya existe una nota con ese título.');
    return;
  }

  notas.push({ titulo, contenido });

  fs.writeFileSync('notas.json', JSON.stringify(notas, null, 2));
  console.log('✅ Nota guardada correctamente.');
}

// Función para listar todas las notas
function listarNotas() {
  if (!fs.existsSync('notas.json')) {
    console.log('📭 No hay notas guardadas.');
    return;
  }

  const datos = fs.readFileSync('notas.json', 'utf8');
  const notas = JSON.parse(datos);

  console.log('📋 Tus notas:');
  notas.forEach((nota, index) => {
    console.log(`${index + 1}. ${nota.titulo}: ${nota.contenido}`);
  });
}

// Función para eliminar una nota por su título
function eliminarNota(titulo) {
  if (!fs.existsSync('notas.json')) {
    console.log('❌ No hay notas para eliminar.');
    return;
  }

  const datos = fs.readFileSync('notas.json', 'utf8');
  const notas = JSON.parse(datos);

  const nuevasNotas = notas.filter(nota => nota.titulo !== titulo);

  if (nuevasNotas.length === notas.length) {
    console.log('⚠️ No se encontró ninguna nota con ese título.');
    return;
  }

  fs.writeFileSync('notas.json', JSON.stringify(nuevasNotas, null, 2));
  console.log(`🗑️ Nota "${titulo}" eliminada correctamente.`);
}

// Procesar argumentos desde la consola
const comando = process.argv[2];
const argumento1 = process.argv[3];
const argumento2 = process.argv[4];

switch (comando) {
  case 'crear':
    if (!argumento1 || !argumento2) {
      console.log('❗ Uso: node gestorNotas.js crear "Título" "Contenido"');
    } else {
      crearNota(argumento1, argumento2);
    }
    break;

  case 'listar':
    listarNotas();
    break;

  case 'eliminar':
    if (!argumento1) {
      console.log('❗ Uso: node gestorNotas.js eliminar "Título"');
    } else {
      eliminarNota(argumento1);
    }
    break;

  default:
    console.log('📚 Comandos disponibles:');
    console.log('  crear "Título" "Contenido"');
    console.log('  listar');
    console.log('  eliminar "Título"');
}
