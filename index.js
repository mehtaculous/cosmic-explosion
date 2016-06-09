/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.73091661-da06-44c8-bfac-2ee89b9b83ca";

/**
 * Array containing space facts.
 */
var FACTS = [
    "Mercury is the closest planet to the Sun and due to its proximity it is not easily seen except during twilight. For every two orbits of the Sun, Mercury completes three rotations about its axis and up until 1965 it was thought that the same side of Mercury constantly faced the Sun. Thirteen times a century Mercury can be observed from the Earth passing across the face of the Sun in an event called a transit, the next will occur on the 9th May 2016.",
    "A year on Mercury is just 88 days long. One solar day, the time from noon to noon on the planet’s surface, on Mercury lasts the equivalent of 176 Earth days while the sidereal day, the time for 1 rotation in relation to a fixed point, lasts 59 Earth days. Mercury is nearly tidally locked to the Sun and over time this has slowed the rotation of the planet to almost match its orbit around the Sun. Mercury also has the highest orbital eccentricity of all the planets with its distance from the Sun ranging from 46 to 70 million km.",
    "Mercury is the smallest planet in the Solar System. One of five planets visible with the naked eye a, Mercury is just 4,879 Kilometres across its equator, compared with 12,742 Kilometres for the Earth.",
    "Mercury is the second densest planet. Even though the planet is small, Mercury is very dense. Each cubic centimetre has a density of 5.4 grams, with only the Earth having a higher density. This is largely due to Mercury being composed mainly of heavy metals and rock.",
    "Mercury has a molten core. In recent years scientists from NASA have come to believe the solid iron core of Mercury could in fact be molten. Normally the core of smaller planets cools rapidly, but after extensive research, the results were not in line with those expected from a solid core. Scientists now believe the core to contain a lighter element such as sulphur, which would lower the melting temperature of the core material. It is estimated Mercury’s core makes up 42% of its volume, while the Earth’s core makes up 17%.",
    "Mercury is only the second hottest planet. Despite being further from the Sun, Venus experiences higher temperatures. The surface of Mercury which faces the Sun sees temperatures of up to 427°C, whilst on the alternate side this can be as low as -173°C. This is due to the planet having no atmosphere to help regulate the temperature.",
    "Only two spacecrafts have ever visited Mercury. Owing to its proximity to the Sun, Mercury is a difficult planet to visit. During 1974 and 1975 Mariner 10 flew by Mercury three times, during this time they mapped just under half of the planet’s surface. On August 3rd 2004, the Messenger probe was launched from Cape Canaveral Air Force Station, this was the first spacecraft to visit since the mid 1970’s.",
    "Mercury is named for the Roman messenger to the gods. The exact date of Mercury’s discovery is unknown as it pre-dates its first historical mention, one of the first mentions being by the Sumerians around in 3,000 BC.",
    "Venus is the second planet from the Sun and is the second brightest object in the night sky after the Moon. Named after the Roman goddess of love and beauty, Venus is the second largest terrestrial planet and is sometimes referred to as the Earth’s sister planet due the their similar size and mass. The surface of the planet is obscured by an opaque layer of clouds made up of sulphuric acid.",
    "A day on Venus lasts longer than a year. It takes 243 Earth days to rotate once on its axis. The planet’s orbit around the Sun takes 225 Earth days, compared to the Earth’s 365.",
    "Venus rotates in the opposite direction to most other planets. This means that Venus is rotating in the opposite direction to the Sun, this is also know as a retrograde rotation. A possible reason might be a collision in the past with an asteroid or other object that caused the planet to alter its rotational path. It also differs from most other planets in our solar system by having no natural satellites.",
    "Venus is the second brightest object in the night sky. Only the Moon is brighter. With a magnitude of between -3.8 to -4.6 Venus is so bright it can be seen during daytime on a clear day.",
    "Atmospheric pressure on Venus is 92 times greater than the Earth’s. While its size and mass are similar to Earth, the small asteroids are crushed when entering its atmosphere, meaning no small craters lie on the surface of the planet. The pressure felt by a human on the surface would be equivalent to that experienced deep beneath the sea on Earth.",
    "Venus is often called the Earth’s sister planet. The Earth and Venus are very similar in size with only a 638 km difference in diameter, Venus having 81.5% of the Earth’s mass. Both also have a central core, a molten mantle and a crust.",
    "Venus is the hottest planet in our solar system. The average surface temperature is 462 °C, and because Venus does not tilt on its axis, there is no seasonal variation. The dense atmosphere of around 96.5 percent carbon dioxide traps heat and causes a greenhouse effect.",
    "The Russians sent the first mission to Venus. The Venera 1 space probe was launched in 1961, but lost contact with base. The USA also lost their first probe to Venus, Mariner 1, although Mariner 2 was able to take measurements of the planet in 1962. The Soviet Union’s Venera 3 was the first man-made craft to land on Venus in 1966.",
    "Earth is the third planet from the Sun and is the largest of the terrestrial planets. The Earth is the only planet in our solar system not to be named after a Greek or Roman deity. The Earth was formed approximately 4.54 billion years ago and is the only known planet to support life.",
    "The Earth’s rotation is gradually slowing. This deceleration is happening almost imperceptibly, at approximately 17 milliseconds per hundred years, although the rate at which it occurs is not perfectly uniform. This has the effect of lengthening our days, but it happens so slowly that it could be as much as 140 million years before the length of a day will have increased to 25 hours.",
    "The Earth was once believed to be the center of the universe. Due to the apparent movements of the Sun and planets in relation to their viewpoint, ancient scientists insisted that the Earth remained static, whilst other celestial bodies travelled in circular orbits around it. Eventually, the view that the Sun was at the centre of the universe was postulated by Copernicus, though this is also not the case.",
    "Earth has a powerful magnetic field. This phenomenon is caused by the nickel-iron core of the planet, coupled with its rapid rotation. This field protects the Earth from the effects of solar wind.",
    "There is only one natural satellite of the planet Earth. As a percentage of the size of the body it orbits, the Moon is the largest satellite of any planet in our solar system. In real terms, however, it is only the fifth largest natural satellite.",
    "The Earth is the densest planet in the Solar System. This varies according to the part of the planet; for example, the metallic core is denser than the crust. The average density of the Earth is approximately 5.52 grams per cubic centimetre.",
    "Mars is the fourth planet from the Sun and is the second smallest planet in the solar system. Named after the Roman god of war, Mars is also often described as the “Red Planet” due to its reddish appearance. Mars is a terrestrial planet with a thin atmosphere composed primarily of carbon dioxide.",
    "Mars and Earth have approximately the same landmass. Even though Mars has only 15% of the Earth’s volume and just over 10% of the Earth’s mass, around two thirds of the Earth’s surface is covered in water. Martian surface gravity is only 37% of the Earth’s gravity, meaning you could leap nearly three times higher on Mars.",
    "Mars is home to the tallest mountain in the solar system. Olympus Mons, a shield volcano, is 21km high and 600km in diameter. Despite having formed over billions of years, evidence from volcanic lava flows is so recent many scientists believe it could still be active.",
    "Only 18 missions to Mars have been successful. As of September 2014 there have been 40 missions to Mars, including orbiters, landers and rovers but not counting flybys. The most recent arrivals include the Mars Curiosity mission in 2012, the MAVEN mission, which arrived on September 22, 2014, followed by the Indian Space Research Organization’s MOM Mangalyaan orbiter, which arrived on September 24, 2014. The next missions to arrive will be the European Space Agency’s ExoMars mission, comprising an orbiter, lander, and a rover, followed by NASA’s InSight robotic lander mission, slated for launch in March 2016 and a planned arrival in September, 2016.",
    "Mars has the largest dust storms in the solar system. They can last for months and cover the entire planet. The seasons are extreme because its elliptical orbital path around the Sun is more elongated than most other planets in the solar system.",
    "On Mars the Sun appears about half the size as it does on Earth. At the closest point to the Sun, the Martian southern hemisphere leans towards the Sun, causing a short, intensely hot summer, while the northern hemisphere endures a brief, cold winter: at its farthest point from the Sun, the Martian northern hemisphere leans towards the Sun, causing a long, mild summer, while the southern hemisphere endures a lengthy, cold winter.",
    "Pieces of Mars have fallen to Earth. Scientists have found tiny traces of Martian atmosphere within meteorites violently ejected from Mars, then orbiting the solar system amongst galactic debris for millions of years, before crash landing on Earth. This allowed scientists to begin studying Mars prior to launching space missions.",
    "Mars takes its name from the Roman god of war. The ancient Greeks called the planet Ares, after their god of war; the Romans then did likewise, associating the planet’s blood-red colour with Mars, their own god of war. Interestingly, other ancient cultures also focused on colour – to China’s astronomers it was ‘the fire star’, whilst Egyptian priests called on ‘Her Desher’, or ‘the red one’. The red colour Mars is known for is due to the rock and dust covering its surface being rich in iron.",
    "There are signs of liquid water on Mars. For years Mars has been known to have water in the form of ice. The first signs of trickling water are dark stripes or stains on crater wall and cliffs seen in satellite images. Due to Mars’ atmosphere this water would have to be salty to prevent it from freezing or vaporising.",
    "One day Mars will have a ring. In the next 20-40 million years Mars’ largest moon Phobos will be torn apart by gravitational forces leading to the creation of a ring that could last up to 100 million years.",
    "The planet Jupiter is the fifth planet out from the Sun, and is two and a half times more massive than all the other planets in the solar system combined. It is made primarily of gases and is therefore known as a 'gas giant'.",
    "Jupiter is the fourth brightest object in the solar system. Only the Sun, Moon and Venus are brighter. It is one of five planets visible to the naked eye from Earth.",
    "Jupiter has the shortest day of all the planets. It turns on its axis once every 9 hours and 55 minutes. The rapid rotation flattens the planet slightly, giving it an oblate shape.",
    "Jupiter orbits the Sun once every 11.8 Earth years. From our point of view on Earth, it appears to move slowly in the sky, taking months to move from one constellation to another.",
    "Jupiter has unique cloud features. The upper atmosphere of Jupiter is divided into cloud belts and zones. They are made primarily of ammonia crystals, sulfur, and mixtures of the two compounds.",
    "The Great Red Spot is a huge storm on Jupiter. It has raged for at least 350 years. It is so large that three Earths could fit inside it.",
    "Jupiter’s interior is made of rock, metal, and hydrogen compounds. Below Jupiter’s massive atmosphere, which is made primarily of hydrogen, there are layers of compressed hydrogen gas, liquid metallic hydrogen, and a core of ice, rock, and metals.",
    "Jupiter’s moon Ganymede is the largest moon in the solar system. Jupiter’s moons are sometimes called the Jovian satellites, the largest of these are Ganymeade, Callisto Io and Europa. Ganymeade measures 5,268 km across, making it larger than the planet Mercury.",
    "Jupiter has a thin ring system. Its rings are composed mainly of dust particles ejected from some of Jupiter’s smaller worlds during impacts from incoming comets and asteroids. The ring system begins some 92,000 kilometres above Jupiter’s cloud tops and stretches out to more than 225,000 km from the planet. They are between 2,000 to 12,500 kilometres thick.",
    "Eight spacecrafts have visited Jupiter. Pioneer 10 and 11, Voyager 1 and 2, Galileo, Cassini, Ulysses, and New Horizons missions. The Juno mission is its way to Jupiter and will arrive in July 2016. Other future missions may focus on the Jovian moons Europa, Ganymede, and Callisto, and their subsurface oceans.",
    "Saturn is the sixth planet from the Sun and the most distant that can be seen with the naked eye. Saturn is the second largest planet and is best known for its fabulous ring system that was first observed in 1610 by the astronomer Galileo Galilei. Like Jupiter, Saturn is a gas giant and is composed of similar gasses including hydrogen, helium and methane.",
    "Saturn was known to the ancients, including the Babylonians and Far Eastern observers. It is named for the Roman god Saturnus, and was known to the Greeks as Cronus.",
    "Saturn is the flattest planet. Its polar diameter is 90% of its equatorial diameter, this is due to its low density and fast rotation. Saturn turns on its axis once every 10 hours and 34 minutes giving it the second-shortest day of any of the solar system’s planets.",
    "Saturn orbits the Sun once every 29.4 Earth years. Its slow movement against the backdrop of stars earned it the nickname of “Lubadsagush” from the ancient Assyrians. The name means 'oldest of the old'.",
    "Saturn’s upper atmosphere is divided into bands of clouds. The top layers are mostly ammonia ice. Below them, the clouds are largely water ice. Below are layers of cold hydrogen and sulfur ice mixtures.",
    "Saturn has oval-shaped storms similar to Jupiter’s. The region around its north pole has a hexagonal-shaped pattern of clouds. Scientists think this may be a wave pattern in the upper clouds. The planet also has a vortex over its south pole that resembles a hurricane-like storm.",
    "Saturn is made mostly of hydrogen. It exists in layers that get denser farther into the planet. Eventually, deep inside, the hydrogen becomes metallic. At the core lies a hot interior.",
    "Saturn has the most extensive rings in the solar system. The Saturnian rings are made mostly of chunks of ice and small amounts of carbonaceous dust. The rings stretch out more than 120,700 km from the planet, but are are amazingly thin: only about 20 meters thick.",
    "Saturn has 150 moons and smaller moonlets. All are frozen worlds. The largest moons are Titan and Rhea. Enceladus appears to have an ocean below its frozen surface.",
    "Four spacecrafts have visited Saturn. Pioneer 11, Voyager 1 and 2, and the Cassini-Huygens mission have all studied the planet. Cassini continues to orbit Saturn, sending back a wealth of data about the planet, its moons, and rings.",
    "Uranus is the seventh planet from the Sun. It’s not visible to the naked eye, and became the first planet discovered with the use of a telescope. Uranus is tipped over on its side with an axial tilt of 98 degrees. It is often described as rolling around the Sun on its side.",
    "Uranus was officially discovered by Sir William Herschel in 1781. It is too dim to have been seen by the ancients. At first Herschel thought it was a comet, but several years later it was confirmed as a planet. Herscal tried to have his discovery named 'Georgian Sidus' after King George III. The name Uranus was suggested by astronomer Johann Bode. The name comes from the ancient Greek deity Ouranos.",
    "Uranus turns on its axis once every 17 hours, 14 minutes. The planet rotates in a retrograde direction, opposite to the way Earth and most other planets turn.",
    "Uranus makes one trip around the Sun every 84 Earth years. During some parts of its orbit one or the other of its poles point directly at the Sun and get about 42 years of direct sunlight. The rest of the time they are in darkness.",
    "Uranus is often referred to as an “ice giant” planet. Like the other gas giants, it has a hydrogen upper layer, which has helium mixed in. Below that is an icy “mantle, which surrounds a rock and ice core. The upper atmosphere is made of water, ammonia and the methane ice crystals that give the planet its pale blue colour.",
    "Uranus hits the coldest temperatures of any planet. With minimum atmospheric temperature of -224°C Uranus is nearly coldest planet in the solar system. While Neptune doesn’t get as cold as Uranus it is on average colder. The upper atmosphere of Uranus is covered by a methane haze which hides the storms that take place in the cloud decks.",
    "Uranus has two sets of very thin dark coloured rings. The ring particles are small, ranging from a dust-sized particles to small boulders. There are eleven inner rings and two outer rings. They probably formed when one or more of Uranus’s moons were broken up in an impact. The first rings were discovered in 1977 with the two outer rings being discovered in Hubble Space Telescope images between 2003 and 2005.",
    "Only one spacecraft has flown by Uranus. In 1986, the Voyager 2 spacecraft swept past the planet at a distance of 81,500 km. It returned the first close-up images of the planet, its moons, and rings.",
    "Neptune is the eighth planet from the Sun making it the most distant in the solar system. This gas giant planet may have formed much closer to the Sun in early solar system history before migrating to its present position.",
    "Neptune spins on its axis very rapidly. Its equatorial clouds take 18 hours to make one rotation. This is because Neptune is not solid body.",
    "Neptune is the smallest of the ice giants. Despite being smaller than Uranus, Neptune has a greater mass. Below its heavy atmosphere, Uranus is made of layers of hydrogen, helium, and methane gases. They enclose a layer of water, ammonia and methane ice. The inner core of the planet is made of rock.",
    "The atmosphere of Neptune is made of hydrogen and helium, with some methane. The methane absorbs red light, which makes the planet appear a lovely blue. High, thin clouds drift in the upper atmosphere.",
    "Neptune has a very active climate. Large storms whirl through its upper atmosphere, and high-speed winds track around the planet at up 600 meters per second. One of the largest storms ever seen was recorded in 1989. It was called the Great Dark Spot. It lasted about five years.",
    "Neptune has a very thin collection of rings. They are likely made up of ice particles mixed with dust grains and possibly coated with a carbon-based substance.",
    "Neptune has 14 moons. The most interesting moon is Triton, a frozen world that is spewing nitrogen ice and dust particles out from below its surface. It was likely captured by the gravitational pull of Neptune. It is probably the coldest world in the solar system.",
    "Only one spacecraft has flown by Neptune. In 1989, the Voyager 2 spacecraft swept past the planet. It returned the first close-up images of the Neptune system. The NASA/ESA Hubble Space Telescope has also studied this planet, as have a number of ground-based telescopes.",
    "The Milky Way Galaxy is our home galaxy in the universe. It is a fairly typical barred spiral with four major arms in its disk, at least one spur, and a newly discovered outer arm. The galactic centre, which is located about 26,000 light-years from Earth, contains at least one supermassive black hole called Sagittarius A, and is crossed by a bar. The Milky Way began forming around 12 billion years ago and is part of a group of about 50 galaxies called the Local Group. The Andromeda Galaxy is part of this group as are numerous smaller galaxies, including the Magellanic Clouds. The Local Group itself is part of a larger gathering of galaxies called the Virgo Supercluster of galaxies.",
    "The Milky Way began as a series of dense regions in the early universe not long after the Big Bang. The first stars to form were in globular clusters that still exist. They are among the oldest stars formed in the Milky Way region.",
    "The Milky Way has grown by merging with other galaxies through time. It is currently acquiring stars from a very small galaxy called the Sagittarius Dwarf Spheroidal, as well as gobbling up material from the Magellanic Clouds.",
    "The Milky Way moves through space at a velocity of about 552 kilometers per second with respect to the Cosmic Microwave Background radiation.",
    "The Milky Way’s central core contains a supermassive black hole. It is commonly referred to as Sagittarius A. It contains the mass of about 4.3 million Suns.",
    "The stars, gas and dust of the Milky Way all orbit the centre at a rate of about 220 kilometres per second. This constant rate for all stars at different distances from the core implies the existence of a shell of dark matter surrounding our galaxy.",
    "The Andromeda Galaxy is the closest large galaxy to the Milky Way and is one of a few galaxies that can be seen unaided from the Earth. In approximately 4.5 billion years the Andromeda Galaxy and the Milky Way are expected to collide and the result will be a giant elliptical galaxy. Andromeda is accompanied by 14 dwarf galaxies, including M32, M110, and possibly M33, The Triangulum Galaxy.",
    "While Andromeda is the largest galaxy in the Local Cluster it may not be the most massive. The Milky May is thought to contain more dark matter, which could make it much more massive.",
    "Since it is the nearest spiral galaxy to us, astronomers use the Andromeda Galaxy to understand the origin and evolution of such galaxies.",
    "The Andromeda Galaxy is approaching the Milky Way at approximately 100 to 140 kilometers per second.",
    "The Andromeda Galaxy has a very crowded double nucleus. Not only does it have a massive star cluster right at its heart, but it also has at least one supermassive black hole hidden at the core.",
    "The Andromeda Galaxy has at least two spiral arms, plus a ring of dust that may have come from the smaller galaxy M32. Astronomers think that it may have interacted more closely with Andromeda several hundred million years ago, when M32 plunged through the heart of its larger neighbor.",
    "There are at least 450 globular clusters orbiting in and around the Andromeda Galaxy. Some of them are among the most densely populated globulars ever seen.",
    "The Andromeda Galaxy is the most distant object you can spot with the naked eye. You need a good spot away from bright lights in order to see it.",
    "The Sun is the star at the center of our solar system and is responsible for the Earth’s climate and weather. The Sun is an almost perfect sphere with a difference of just 10km in diameter between the poles and the equator. The average radius of the Sun is 695,508 km of which 20–25% is the core.",
    "One million Earths could fit inside the Sun. If a hollow Sun was filled up with spherical Earths then around 960,000 would fit inside. On the other hand if these Earths were squished inside with no wasted space then around 1,300,000 would fit inside. The Sun’s surface area is 11,990 times that of the Earth’s.",
    "The Sun contains 99.86% of the mass in the Solar System. The mass of the Sun is approximately 330,000 times greater than that of Earth. It is almost three quarters Hydrogen, whilst most of the remaining mass is Helium.",
    "The Sun is an almost perfect sphere. There is only a 10 kilometre difference in its polar diameter compared to its equatorial diameter. Considering the vast expanse of the Sun, this means it is the closest thing to a perfect sphere that has been observed in nature.",
    "The temperature inside the Sun can reach 15 million degrees Celsius. At the Sun’s core, energy is generated by nuclear fusion, as Hydrogen converts to Helium. Because hot objects generally expand, the Sun would explode like a giant bomb if it weren’t for its enormous gravitational force. The temperature on the surface of the Sun is closer to 5,600 degrees Celsius.",
    "Eventually, the Sun will consume the Earth. When all the Hydrogen has been burned, the Sun will continue for about 130 million more years, burning Helium, during which time it will expand to the point that it will engulf Mercury and Venus and the Earth. At this stage it will have become a red giant",
    "The Sun will one day be about the size of Earth. After its red giant phase, the Sun will collapse, retaining its enormous mass, but containing the approximate volume of our planet. When this happens, it will be called a white dwarf.",
    "Light from the Sun takes eight minutes to reach Earth. With a mean average distance of 150 million kilometres from Earth and with light travelling at 300,000 kilometres per second, dividing one by the other gives us an approximate time of 500 seconds, or eight minutes and 20 seconds. Although this energy reaches Earth in a few minutes, it will already have taken millions of years to travel from the Sun’s core to its surface.",
    "The Sun travels at 220 kilometres per second. The Sun is 24,000-26,000 light years from the galactic centre and it takes the Sun 225-250 million years to complete an orbit of the centre of the Milky Way.",
    "The distance from the Sun to Earth changes throughout the year. Because the Earth travels on an elliptical orbit around the Sun, the distance between the two bodies varies from 147 to 152 million kilometres. The distance between the Earth and the Sun is called an Astronomical Unit.",
    "The Sun is middle-aged. At around 4.5 billion years old, the Sun has already burned off about half of its store of Hydrogen. It has enough left to continue to burn Hydrogen for approximately another 5 billion years. The Sun is currently a type of star known as a Yellow Dwarf.",
    "The Sun has a very strong magnetic field. Solar flares occur when magnetic energy is released by the Sun during magnetic storms, which we see as sunspots. In sunspots, the magnetic lines are twisted and they spin, much like a tornado would on Earth.",
    "The Sun generates solar wind. This is a stream of charged particles, which travels through the Solar System at approximately 450 kilometres per second. Solar wind occurs where the magnetic field of the Sun extends into space instead of following its surface.",
    "The Moon is the Earth’s only natural satellite and was formed 4.6 billion years ago around some 30–50 million years after the formation of the solar system. The Moon is in synchronous rotation with Earth meaning the same side is always facing the Earth.",
    "The rise and fall of the tides on Earth is caused by the Moon. There are two bulges in the Earth due to the gravitational pull that the Moon exerts; one on the side facing the Moon, and the other on the opposite side that faces away from the Moon, The bulges move around the oceans as the Earth rotates, causing high and low tides around the globe.",
    "The Moon is drifting away from the Earth. The Moon is moving approximately 3.8 cm away from our planet every year. It is estimated that it will continue to do so for around 50 billion years. By the time that happens, the Moon will be taking around 47 days to orbit the Earth instead of the current 27.3 days.",
    "The first spacecraft to reach the Moon was Luna 1 in 1959. This was a Soviet craft, which was launched from the USSR. It passed within 5995 km of the surface of the Moon before going into orbit around the Sun.",
    "The Moon is the fifth largest natural satellite in the Solar System. At 3,475 km in diameter, the Moon is much smaller than the major moons of Jupiter and Saturn. Earth is about 80 times the volume than the Moon, but both are about the same age. A prevailing theory is that the Moon was once part of the Earth, and was formed from a chunk that broke away due to a huge object colliding with Earth when it was relatively young.",
    "The nucleus of a comet is made of ice and can be as small as a few meters across to giant boulders a few kilometres across.",
    "As a comet gets closer to the Sun, it begins to experience heat. That causes some of its ices to sublimate, similar to dry ice sizzling in sunlight. If the ice is close to the comet’s surface, it may form a small jet of material spewing out from the comet like a mini-geyser.",
    "Material streams from comets and populates the comet’s orbit. If Earth, or another planet, happens to move through that stream, those particles fall to Earth as meteor showers.",
    "As a comet gets close to the Sun, it loses some of its mass due to the sublimation. If a comet goes around enough times, it will eventually break up. Comets also break up if they come too close to the Sun or another planet in their orbits.",
    "Comets are usually made of frozen water and supercold methane, ammonia and carbon dioxide ices. Those are mixed with rock, dust, and other metallic bits of solar system debris.",
    "Comets have two tails: a dust tail, which you can see with the naked eye, and a plasma tail, which is easily photographed but difficult to see with your eyes.",
    "Many comets are formed in the Oort Cloud and Kuiper Belts, two of the outermost regions of the solar system.",
    "Asteroids are small, rocky solar system bodies that populate interplanetary space out to the orbit of Jupiter. There are millions of them, and they are often grouped by their composition. They are referred to as minor planets, a general term applied to solar system bodies smaller than moons.",
    "Asteroids are mainly made of materials left over from the formation of the inner solar system words. Most of them orbit the Sun between Mars and Jupiter, although there are groups of them that orbit closer.",
    "An asteroid impact some 65 million years ago contributed to the extinction of the dinosaurs. It was one of several factors that affected all life on Earth at that time.",
    "Titan is Saturn’s largest moon and is the second largest moon in our solar system. If it were not orbiting Saturn, Titan could be considered a planet as it is larger than Mercury. Titan is covered with a thick atmosphere that some consider to be similar to that of early Earth."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a cosmic fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your cosmic fact: " + randomFact;
    var cardTitle = "Your Cosmic Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

