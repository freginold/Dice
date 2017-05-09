![Dice](https://github.com/freginold/Dice/blob/master/dice.PNG)

Dice is a bit of JavaScript that slices up text nodes into individual `span` elements to allow for detailed styling.  With Dice, you can break up a word, phrase, line, or paragraph into one-character elements that can be styled by ID or class(es).

Dice is very flexible and can be customized to suit your needs.  By default, Dice will assign an incremental ID to each new `span` element: `diced1`, `diced2`, etc. You can change the ID prefix to whatever you want, or forget assigning IDs altogether.  Classes can be assigned to the characters by odd/even designation (odd number characters get one class or class string and even numbers get another) or you can assign one class (or list of classes) to all characters.  You can even designate certain characters (maybe a space or punctuation) to be skipped.

## Usage

Using Dice is simple. Download the **dice.js** file from this repository and call it from your HTML:

    <script src="dice.js"></script>

Then, in its most basic form, use Dice like this:

    dice(textNode);

where `textNode` is the text node containing the text that you want to split.  You can also pass in a text node's parent element, and Dice will search through the children for the first non-empty text node that it finds.

Dice can be customized using object properties for greater control and flexibility.

### Properties

Dice has several configurable properties, which can be passed into the function as an object.

#### `id`
Any string here will be used as the ID prefix for the character nodes created by Dice. By default, `id` is set to `diced`. Setting `id` to `false` will disable assigning an ID to each character node.

#### `all`
Give `all` a string value to assign a class to each character in the text node.  You can assign a single class (`all: class1`) or a space-delimited list of classes (`all: class1 class2 class3`).

