async function fetchRecipes() {
    const apiKey = '51b07b2a5f164442a090682c25d8bb2a'; // Tu clave de API
    const numberOfRecipes = 9; // Número de recetas a cargar
    const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=${numberOfRecipes}&language=es`;
    
    console.log('Fetching recipes from:', apiUrl);
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);
        return data.recipes || []; // Aquí debe ser data.recipes
    } catch (error) {
        console.error('Error al cargar las recetas:', error);
        return [];
    }
}

function createRecipeCard(recipe) {
    const card = document.createElement('article');
    card.className = 'recipe-card';

    const link = document.createElement('a');
    link.href = recipe.sourceUrl || '#'; // Cambia esto a la propiedad correcta para la URL de la receta
    link.target = '_blank'; // Abre en nueva pestaña

    const image = document.createElement('img');
    image.src = recipe.image || '/placeholder.svg';
    image.alt = recipe.title;

    const title = document.createElement('h2');
    title.textContent = recipe.title;

    const description = document.createElement('p');
    description.textContent = recipe.summary
        ? recipe.summary.replace(/<\/?[^>]+(>|$)/g, "").split('.')[0] + '.'
        : 'Descripción no disponible.';

    // Añade la imagen y el título al enlace
    link.appendChild(image);
    link.appendChild(title);
    card.appendChild(link); // Añade el enlace a la tarjeta
    card.appendChild(description);

    return card;
}

async function loadRecipes() {
    const recipesGrid = document.getElementById('recipes-grid');
    recipesGrid.innerHTML = '<p>Cargando recetas...</p>';

    const recipes = await fetchRecipes();

    if (recipes.length === 0) {
        recipesGrid.innerHTML = '<p>No se pudieron cargar las recetas. Intenta de nuevo más tarde.</p>';
        return;
    }

    recipesGrid.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        recipesGrid.appendChild(recipeCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadRecipes();
});

