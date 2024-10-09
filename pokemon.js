;(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    console.log(id);

    fetch("pokedex.json")
        .then((rawData) => rawData.json())
        .then((pokedex) => {
            console.log(pokedex[id]);

            let pokemon = pokedex[id];
            let pokemonId = pokemon["id"].toString().padStart(4, '0');
            let name = pokemon["name"]["english"];
            let image = pokemon["image"]["hires"];
            let desc = pokemon["description"];
            let types = pokemon["type"];
            let typesHtml = "";
            
            // Correctly create types HTML
            types.forEach((type) => {
                typesHtml += `<span class="${type.toLowerCase()}">${type}</span>`;
            });

            let species = pokemon["species"];
            let height = pokemon["profile"]["height"];
            let weight = pokemon["profile"]["weight"];
            let abilities = pokemon["profile"]["ability"];
            let abilitiesHtml = "";
            
            abilities.forEach((ability) => {
                abilitiesHtml += `<span class="pokemon-ability">${ability[0]}</span>`;
            });

            // Display the Pokemon details
            $("#pokemon-page-name").html(name);
            $(".pokemon-page-description").html(desc); 
            $(".pokemon-page-image").html(`<img src="${image}" alt="${name}">`);
            $(".pokemon-type").html(typesHtml);


            // Display the detailed stats
            $(".pokemon-page-id").html(pokemonId);
            $(".pokemon-page-species").html(species);
            $(".pokemon-page-height").html(height);
            $(".pokemon-page-weight").html(weight);
            $(".pokemon-page-abilities").html(abilitiesHtml);

            // Stats section
            let hp = pokemon["base"]["HP"];
            let attack = pokemon["base"]["Attack"];
            let defense = pokemon["base"]["Defense"]; 
            let sp_attack = pokemon["base"]["Sp. Attack"];
            let sp_defense = pokemon["base"]["Sp. Defense"];
            let speed = pokemon["base"]["Speed"];
            let hp_per = (hp / 200)* 100;
            let attack_per = (attack / 200)* 100;
            let defense_per = (defense / 200)*100;
            let sp_attack_per = (sp_attack /200)*100;
            let sp_defense_per = (sp_defense /200)*100;
            let speed_per = (speed/200)*100;
            let total = hp + attack + defense + sp_attack + sp_defense+ speed;
           
            $(".hp-val").html(`<div> ${hp}</div>`);
            $(".attack-val").html(`<div>${attack}</div>`);
            $(".defense-val").html(`<div>${defense}</div>`);
            $(".sp-attack-val").html(`<div>${sp_attack}</div>`);
            $(".sp-defense-val").html(`<div>${sp_defense}</div>`);
            $(".speed-val").html(`<div>${speed}</div>`);
            $(".total").html(`<div> ${total}</div>`);


            $(".hp div").animate({width: (200/100)* hp_per},1000);
            $(".attack div").animate({width: (200/100)* attack_per},1000);
            $(".defense div").animate({width: (200/100)*defense_per},1000);
            $(".sp-attack div").animate({width: (200/100)* sp_attack_per},1000);
            $(".sp-defense div").animate({width: (200/100)* sp_defense_per},1000);
            $(".speed div").animate({width: (200/100)* speed_per}, 1000);
        })  
})();
