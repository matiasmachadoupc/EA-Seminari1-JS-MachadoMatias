console.log("Inicio");

// Obtenemos usuario de la API
function getUser(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener el usuario");
      return response.json();
    });
}

// Obtenemos los posts del usuario
function getPosts(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener los posts");
      return response.json();
    });
}

// Obtenemos los comentarios de cada post
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

    // Filtramos comentarios con fragmento "et"
    const filteredComments = commentsArray.flat().filter(comment => comment.body.includes("et"));

    // Array objetos con Id y número de comentarios que contienen el fragmento "et"
    const commentsCount = commentsArray.map((comments, index) => ({
      postId: posts[index].id,
      count: comments.filter(comment => comment.body.includes("et")).length
    }));

    // Utilizamos reduce para recuento total de comentarios que contengan le fragmento.
    const totalFilteredComments = commentsCount.reduce((total, post) => total + post.count, 0);

    console.log('Comentarios filtrados que contienen la palbra o fragmento "et":', filteredComments);
    console.log("Conteo de comentarios por post con la palabra específica:", commentsCount);
    console.log("Total de comentarios filtrados:", totalFilteredComments);
    console.log("Fin");
  } catch (error) {
    console.error("Error:", error);
  }
}




fetchOrderDetails();