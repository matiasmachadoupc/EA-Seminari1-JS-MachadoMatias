console.log("Inicio");

// Función para obtener un usuario de una API
function getUser(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener el usuario");
      return response.json();
    });
}

// Función para obtener los posts de un usuario
function getPosts(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener los posts");
      return response.json();
    });
}

// Función para obtener los comentarios del post
function getComments(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener comentarios del post");
      return response.json();
    });
}

async function fetchOrderDetails() {
  try {
    const user = await getUser(1);
    const posts = await getPosts(user.id);
    const commentsPromises = posts.map(post => getComments(post.id));
    const commentsArray = await Promise.all(commentsPromises);

    // Filtrar comentarios que contienen la palabra "qui"
    const filteredComments = commentsArray.flat().filter(comment => comment.body.includes("qui"));

    // Crear un array de objetos con postId y número de comentarios que contienen la palabra específica
    const commentsCount = commentsArray.map((comments, index) => ({
      postId: posts[index].id,
      count: comments.filter(comment => comment.body.includes("eum")).length
    }));

    // Utilizar reduce para contar el total de comentarios que contienen la palabra específica
    const totalFilteredComments = commentsCount.reduce((total, post) => total + post.count, 0);

    console.log('Comentarios filtrados que contienen la palbra o fragmento "eum":', filteredComments);
    console.log("Conteo de comentarios por post con la palabra específica:", commentsCount);
    console.log("Total de comentarios filtrados:", totalFilteredComments);
    console.log("Fin");
  } catch (error) {
    console.error("Error:", error);
  }
}



fetchOrderDetails();