<?php

namespace Database\Seeders\Tenants;

use App\Models\Tenant;
use App\Models\HallOwner\Cuisine;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CuisineSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run()
    {
        $data = [
            [
                'name' => 'French Cuisine',
                'description' => 'Known for its class and finest ingredients, French cuisine is home to the best gourmet meal and Michelin guide. Right from truffles, sea food, croissants and baguette, each dish is cooked to detail and had with a glass of wine. Every flavour and spice will burst in one\'s mouth and will leave them craving for more.',
                'price' => 1500,
            ],
            [
                'name' => 'Chinese Cuisine',
                'description' => 'One of the most diverse cuisines in the world, Chinese cuisine has been around for over 200 years. Some of the ingredients are chosen from the greens in the mountains and some of the finest people should tuck into is the fresh, salty seafood and lamb. It is one of the various types of cuisines that has remained a favourite throughout.',
                'price' => 1600,
            ],
            [
                'name' => 'Japanese Cuisine',
                'description' => 'Have you ever eaten with chopsticks? if you haven\'t, then you should tuck into some of the finest Japanese food with chopsticks. Some of the most well known Japanese cuisines are Sushi and Tofu.  The flavours has always a rich taste one\'s mouth, which is not something that happens with every dish. These are dishes that can be eaten with fried vegetables and boiled rice.',
                'price' => 1700,
            ],
            [
                'name' => 'Indian Cuisine',
                'description' => 'No vacation is complete without enjoying a wholesome Indian meal. Indian cuisine offers some of the most yummy dishes like Tandoori Chicken, Paneer Butter Masala, Naan bread, and many more. Those who had the chance too tuck into the best, have always licked their fingers after each meal.',
                'price' => 1800,
            ],
            [
                'name' => 'Italian Cuisine',
                'description' => 'Spaghetti, Pasta, Pizza and a few others, are some of the various types of Italian cuisines people from around the world love and are ordering it at restaurants or eating at home. Italian cuisine is one of the best and the true taste they say is only found in Italy.',
                'price' => 1900,
            ],
            [
                'name' => 'Greek Cuisine',
                'description' => 'Greek Cuisine is one of the most unique types of cuisines that offer some of the finest kebab with lamb, pork and chicken meat. When it comes to defining Greek cuisine, elegance and diverse are the 2 words that come to mind. Fruit, nuts, legumes and herbs are some of the local seasonal treasures and bread, olives and wine are some of the oldest ingredients.',
                'price' => 2000,
            ],
            [
                'name' => 'Spanish Cuisine',
                'description' => 'Every time people hear of Spanish cuisines, they feel the need to go to Spain. Well, they aren’t entirely wrong.  Spanish cuisine has a character of its own as it offers a diverse range of seafood along with Paella, tapas, stews, chorizo, Serrano ham and beans. The cuisine is not homogeneous and the culture of the country is defined by its food.',
                'price' => 2100,
            ],
            [
                'name' => 'Lebanese Cuisine',
                'description' => 'When the words Lebanese food comes to mind, what is the first thing that comes to mind? A kaleidoscope of sensory elements like aromatic perform of cinnamon, cumin, thyme and roasting meat. Some of the most flavoursome cuisines people should tuck into are citrusy sumac, earthy za’atar, and dessert with honey.',
                'price' => 2200,
            ],
            [
                'name' => 'Moroccan Cuisine',
                'description' => 'Moroccan cuisine is rich in flavours and will never disappoint you.  A blend of Arabic, Andalusian, Berber and Mediterranean cuisines with European and Subsaharan influence are some of the things people will get a taste off. It is one of the most remarkable cuisines people should get a taste off.  It is known for its spices and they say no meal is complete without it.',
                'price' => 2300,
            ],
            [
                'name' => 'Turkish Cuisine',
                'description' => 'Turkish food is one of the best cuisines in the world that offers eggplant, lamb kebabs, fried vegetables, dolmas, and walnuts. Each dish is cooked with nuts and vegetables, especially boiled. They believe it brings out the flavors and gives it a rich taste. Each meal is served with drinks like  coffee, black tea, and wine.',
                'price' => 2400,
            ],
            [
                'name' => 'Thai Cuisine',
                'description' => 'Thai cuisine is one of most famous cuisine served at every restaurant in your country. Thai dishes are cooked with a diverse range of spices and mint. The mint gives the Thai dishes a very nice cold flavor people often like, especially their Thai curry.',
                'price' => 2500,
            ],
        ];

        Tenant::all()->runForEach(function () use ($data) {
            foreach ($data as $key => $value) {
                (new Cuisine())->create($value);
            }
        });
    }
}
