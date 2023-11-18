<?php

namespace Database\Seeders\HallOwner;

use App\Models\Tenant;
use App\Models\HallType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use stdClass;

class HallTypeSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run()
    {
        Tenant::all()->runForEach(function () {
            $HallType = (new HallType())->create([
                'name' => 'Traditional wedding venue',
                'description' => 'Traditional wedding venue',
                'parent_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $data = [
                [
                    'name' => 'Stand-alone banquet hall',
                    'description' => 'Designed to host large-scale or intimate celebrations, banquet hall venues are at-the-ready with elegant interiors and fully equipped kitchens. Most banquet halls have an in-house catering team with set menus, though some allow the option of an outside caterer. Stand-alone banquet halls are great choices for the experience of their staff and their convenience.',
                    'parent_id' => $HallType->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Bed & breakfast or inn',
                    'description' => 'Whether you choose an inn by the sea or a small boutique hotel in a big city, your choices are endless with a bed & breakfast wedding venue. Inns and B&Bs are known for their intimate charm, which extends to weddings as well. LookRoom for package deals that include overnight rooms for both the wedding party and your out-of-town guests',
                    'parent_id' => $HallType->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Hotel or resort',
                    'description' => 'These venues are known for their polished staff and facilities, and often beautiful surroundings — particularly when the venue is within a vacation resort. But one of the primary draws of hotel and resort venues is their unmatched convenience. You can host the ceremony, reception, and out-of-town guests in one place, and eliminate the logistical headache of getting people to and from events at different locales.',
                    'parent_id' => $HallType->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'House of worship',
                    'description' => 'If you\'re planning a traditional religious wedding ceremony, this is an affordable option. Keep in mind, not all houses of worship have the space or equipment for receptions. If they do, the onsite kitchen may be fully equipped or bare-bones; your only option maybe outside catering and a buffet set up. Make sure you know what you’re dealing with before you book.',
                    'parent_id' => $HallType->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Country club',
                    'description' => 'Country clubs sit on picturesque private or public golf courses, often with panoramic views for spectacular photos. These facilities typically offer elegant interiors and white-glove service from an experienced staff. However, some private clubs require membership or sponsorship by a member to book events — find out the requirements before falling in love with a private facility.',
                    'parent_id' => $HallType->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Historic site, home, or mansion',
                    'description' => 'You\'ll love the hint of the past that comes alive with a wedding at a historic venue. Think rich architectural styles, such as Victorian, Colonial, or Romantic, and distinctive interiors. Homes on the historic registry often feature impressive grounds and gardens that are perfect for an outdoor ceremony and pictures. The San Francisco Mint — opened in 1974 — makes a striking wedding backdrop with its Greek Revival facade, sleek granite interior courtyard, and bridal suite in the Coiner’s Office.',
                    'parent_id' => $HallType->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Vacation rental',
                    'description' => 'Consider independent vacation rentals for your small, intimate wedding location. This is a great choice for a DIY wedding — you can rent out the entire property and hold the ceremony outside and the reception inside. Vacation rentals also make for the perfect destination wedding venue (think Cape Cod beach house or a Santa Fe ranch). Be upfront about your reason for renting, the size of your party, and plan for cleaning up after the event. The owner or rental agency may say no, or they may ask for pictures they can add to their websites and post to social media.',
                    'parent_id' => $HallType->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Museum',
                    'description' => 'There is something distinctive about getting married in a museum. From the stunning Museum of Glass in Tacoma, Washington to the whimsical Museum of International Folk Art in Santa Fe, New Mexico, museum wedding venues offer stunning backdrops and one-of-a-kind decor. Find out if your favorite museum hosts weddings, or research museum venues that match your wedding style, whether that is sophisticated, vibrant, modern, or quirky.',
                    'parent_id' => $HallType->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Restaurant',
                    'description' => 'Do you and your beloved have a favorite place for laid-back meals or romantic dinners? Consider renting a private room for your small-scale wedding and reception. You may even be able to book the entire restaurant during the day if they are only open in the evenings. Depending on the restaurant, this can be a budget saver because many don’t charge a separate facility or service fee.',
                    'parent_id' => $HallType->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ];

            $HallType = (new HallType())->create([
                'name' => 'Outdoor wedding venue',
                'description' => 'Outdoor wedding venue types',
                'parent_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $data = array_merge($data, [
                [
                    'name' => 'Beach or waterfront',
                    'description' => 'Whether you overlook an ocean, lake, or river, there’s something undeniably romantic and peaceful about a wedding venue near a body of water. For the ceremony, many waterside venues offer dedicated setups with arches or gazebos you can decorate to your liking. The reception space may be a pavilion, a large tent, an indoor space with glass French doors, or an outdoor platform beneath the stars.',
                    'parent_id' => $HallType->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Winery or vineyard',
                    'description' => 'Choose a destination wedding in wine country among rolling hills while dining on exceptional food — often prepared by award-winning chefs. Wineries may have an elegant ambiance or a decidedly rustic edge, but there will always be exceptional wine on hand. Top wine regions in the US include Napa Valley, Sonoma, and Paso Robles in California, the Willamette Valley in Oregon, Texas Hill Country in Texas, and the Finger Lakes region of New York State.',
                    'parent_id' => $HallType->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Barn or farm',
                    'description' => 'Verdant fields, vaulted timber ceilings, wood-plank floors perfect for dancing — rustic style is built right in when you book a barn or farm venue. With fairy lights, mismatched vintage china, and blanket-covered hay bales for seating range, these venues have a homespun charm. With chandeliers, velvet accents, and white-washed furnishings, barn and farm venues offer sophistication with a rustic twist.',
                    'parent_id' => $HallType->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);

            $HallType = (new HallType())->create([
                'name' => 'Unique wedding venue',
                'description' => 'Unique wedding venue',
                'parent_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $data = array_merge($data, [
                [
                    'name' => 'Antique or vintage store',
                    'description' => 'If you and your spouse-to-be share a love of vintage decor or a kitschy retro environment, consider holding your wedding in a vintage shop or antique warehouse. Reach out to your regular haunts when you go antiquing to see if they\'ll host, and make it clear you will be respectful of their merchandise and have full-coverage wedding insurance.',
                    'parent_id' => $HallType->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Chateau or castle',
                    'description' => 'Weave fairytale romance into your day with a chateau wedding. Ballrooms, wood-panelled walls, chandeliers, and grand marble staircases lend a regal elegance to your day. Outside, manicured lawns, terraces, tower parapets, and rose gardens offer endless lovely backdrops for wedding party photos.',
                    'parent_id' => $HallType->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Chateau or castle',
                    'description' => 'Consider a wedding at an amusement park wedding with roller coaster rides for you and your guests before or after the wedding. These venues typically offer packages that include venue space and theme park admission. (Consider fast-pass tickets for the wedding party.) Choose a destination like Disney World or Universal Studios and extend your extend your stay for a honeymoon in Florida. ',
                    'parent_id' => $HallType->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);

            foreach ($data as $key => $value) {
                (new HallType())->create($value);
            }
        });
    }
}
