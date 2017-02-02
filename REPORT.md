# Final report

## My visualization

This project aims to show the amount of money that is spent on or in the name of pseudo-science, like the Myer-Briggs personality type test. Starting out with a quiz users will get a couple of questions meant to surprise and entice the user to want to find out more. Following this they are led to the main visualization which they can explore at their leisure, showing the startling amounts of money these unproven and unscientific fields garner. Choosing one of the fields will give a description (source: Wikipedia) of said field, as well as some visualizations showing the shaky foundations (or total lack thereof) that the field is based on.


## The design

The visualization is broken up in two parts: a starting page with the quiz which when finished leads to the graphs. Both pages are comprised of a single html page and a single javascript file, while drawing on the relevant libraries where needed. All the style and formatting is contained to a single file: styles.css. Bootstrap was included with the intention of using it for style, but it is currently only used for its glyphicon-functionality.

### quiz

The quiz is included in the site's index html so it automatically loads when the site is visited. Index.html contains a link to the css and jquery in the header, a div designated for the quiz, and finally the quiz javascript itself. The javascript has an init function to initialize and create the quiz, including in it 3 helper functions: a nextQuestion function to create a page for every question, an addChoices function to add the necessary answer buttons and a setupButtons function to make those buttons work. Making the quiz progress are the processQuestion function, which evaluates the users answer and returns information, and an endQuiz function which clears all redundant information and shows results. The results are followed by a link which allows the user to go on to the graphs.

### graphs

This part is built within the framework of the main.html file, which includes two css files in the header (bootstrap and personally defined styles) and a body containing nested divs, followed by the D3, jquery and bootstrap javascript libraries and finally the page's javascript file. This setup allows for easier placement and removal of all the separate elements that go into this page. The javascript contains three big helper functions for drawing different graphs: mainGraph draws the visualization's center graph, which in turn uses the makeBar and makeLine helper funtions to draw the supporting graphs per subject. The reason the main graph is not simply in the body of the javascript is that in order to reduce clutter it gets removed and replaced by background information when a sector is chosen, and then redrawn when the user chooses to by clicking on a reset button. The main body of the javascript loads in the data, loops over the data to produce a visualization for number of practitioners based on icons, calls the mainGraph function, and draws a pie chart to give an overview of number of users per sector.


## Challenges

### Overarching challenges

One of the biggest challenges I faced during this project was one outside of my control. A close colleague of mine committed suicide. The resulting lack of focus made it difficult to get traction on this project and caused some of the underlying problems of the initial concept to surface relatively late into the project.

A challenge not tied to this project but to my personality (which I discovered because of this project) is my tendency to get stuck on a single problem. This occurred multiple (see specific challenges) times and each time I quite simply found myself unable to let it go and move on to a different part of my project; I just had to keep banging my head against the wall until the problem was resolved. This not only cost me in time but I'm quite sure also hurt my creativity/enthusiasm. Despite becoming aware of this during the second week I found myself still doing this in week four. For future projects it will be key to find a way to deal with this.

Because most D3 visualizations are based on big data it was quite tricky to find examples of smaller, dynamically generated and removed visualizations I could use as sources of ideas or troubleshooting.

### Specific challenges

First and foremost: finding and formatting data. Despite there being numerous papers on the pseudoscience I deal with in my project, virtually none of these gives you access to the raw data they base their claims on. Hunting through tons of papers and sites, reconstructing data based on parameters mentioned in the texts was an extremely time-consuming endeavor and has led to data which, while probably good as an impression, can not be published as fact.

Midway through my project I switched from D3.v3 to D3.v4 after finding a really nice example for a line graph I could use as a template for my makeLine function. This caused some things to stop working. I spent a whole afternoon and the better part of a morning on trying to fix them, before giving up and looking for a D3.v4 solution. I found one I could convert and implement in less than 15 minutes.

Spent an entire day trying to append glyphicons to an svg. Could not get it to work properly, instead they kept on overlapping each other. Spent another morning trying to align them with x-offsets, but making those fit different scales was a nightmare. A group member then made the suggestion of appending them directly to the div instead, which works perfectly.


## Design decisions

Scrapping the database idea for the quiz was an easy one to make; the added benefit would have been minor and the time investment probably quite high. The only real benefit would be experience for future projects. Shifting the quiz so it is the first thing people see is another decision I feel was made 100% correctly; it works better as a fun way to get interest going than as a sort of test after the fact, seeing how much someone learned from the data-set. People like being stimulated better than being judged.
While unconventional I think D3 really shines in showing people smaller data-sets in the way I do in my project; rather than slogging through a paper just to find the interesting bits, here they are displayed cleanly on one page, able to be explored at the whim of the person using it. Not interested in Psychics but the more medical pseudoscience interests you? You can simply click on those and leave the psychic information for the more paranormally interested.
Ultimately, some of the linked elements feel a bit forced; this data didn't immediately lend itself to a lot of interlocking parts, which made adhering to that part of the requirements tough. But rather than switching to an easier set of data, I decided to stick with the one that I was enthusiastic about, as I hoped that would keep me more motivated and creative.
