PFont font;
final String[] MANTRA = {"Zufall", "existiert", "nicht."};
final int SPEED = 210;     // Words per minute
final int FRAME_RATE = 30; // Frames per sec (for rendering)
int framesForWord;         // The number of frames a word as to be displayed for in order to match the speed considering the framerate
final int FONT_SIZE = 40;
String word;               // The word to display in the mantra
final int totalDuration = 1;
int maxFrames;

void setup() {
  
  // Set things up
  size(500, 500);
  background(255);
  frameRate(FRAME_RATE);
  framesForWord = SPEED * (FRAME_RATE/60); // Speed conversion: frames (words) / sec
  maxFrames = FRAME_RATE * (totalDuration*60); 
  
  font = createFont("Georgia", FONT_SIZE);
  textFont(font);
  word = "Zufall";
  
  // Log setup
  println("[INFO] Speed is: " + SPEED + " words per minute");
  println("[INFO] Target frame rate is: " + FRAME_RATE + " fps");
  println("[INFO] Taret duration is: " + totalDuration + " minutes, hence: " + maxFrames + " frames");
  println("[INFO] Each word will use: " + framesForWord + " frames");
}

void draw() {
  // Canvas
  background(255);

  // Text
  fill(0);
  textAlign(CENTER);
  text(word, 250, 250);

  if (frameCount % framesForWord == 0) {  // Change word
    // Pick a random word
    int indexPicked = int(random(MANTRA.length -1)); 
    word = MANTRA[indexPicked];
    println("[INFO] New word will be: " + word);
    // Prepare next pick
    int lastIndex = MANTRA.length - 1;
    String savedLast = MANTRA[lastIndex];
    MANTRA[lastIndex] = word;
    MANTRA[indexPicked] = savedLast;
  }
  
  if (frameCount == maxFrames){
    noLoop();
  }

  // Save Frame
  //saveFrame("./out/frame-####.tiff");
}
