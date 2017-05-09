![Dice](https://github.com/freginold/Dice/blob/master/dice.PNG)

Dice is a bit of JavaScript that slices up text nodes into single-character `span` elements to allow for much more detailed styling.  With Dice, you can break up a word, phrase, line, or paragraph into one-character elements that can be styled by ID or class(es).

Dice is very flexible and can be customized to suit your needs.  By default, Dice will assign an incremental ID to each new `span` element: `diced1`, `diced2`, etc. You can change the ID prefix to whatever you want, or forget assigning IDs altogether.  Classes can be assigned to the characters by odd/even designation (odd number characters get one class or class string and even numbers get another) or you can assign one class (or list of classes) to all characters.  You can even designate certain characters (maybe a space or punctuation) to be skipped.

## Usage

Using Dice is simple. Download the **[dice.js](https://github.com/freginold/Dice/blob/master/dice.js)** file from this repository and call it from your HTML:

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

#### `odd`
The class or class list set as the value for `odd` will be applied to all odd-numbered characters. The count goes by character number, not index, so the first character will be odd.  The count does not apply to any skipped characters.

#### `even`
Similar to the `odd` property except... well, you know.

#### `skip`
`skip` accepts a string containing any characters that you don't want an ID or class assigned to. These characters should not be delimited, so setting `skip` as "`aF ,1`" will tell Dice to skip all lower-case a's, capital F's, spaces, commas, and 1's. `skip` is case-sensitive.

### Setting the Properties

Dice looks for the property values as one object. You can either set the properties inside the function call itself, or set them beforehand and assign the values to an object.

[more here soon]

### Return Value

Dice returns a value equal to the number of characters processed. This value is useful if you'll be using JavaScript to manipulate the `span` elements later on. The value does not include any skipped characters, so calling Dice on an element with `innerText` of "`Hi there`" and `skip` set to "`e`" would return `6`.

### Error Messages

Dice logs error messages to the console for debugging and error handling.

##### `Dice.js error 0: Argument is not a valid node.`
If you get this error, it's probably because the first argument passed in is not an HTML node. Make sure to pass in a valid element object (i.e. `document.getElementById("myDiv")` or `document.getElementById("myDiv").childNodes[1]`) rather than just an ID (`myDiv`).

##### `Dice.js error 1: No valid text node was found.`
The node or element passed in is not a text node, and none of that node's children are (non-empty) text nodes.

##### `Dice.js error 2: Text node passed in is empty.`
The text node passed in as the argument is empty (or only contains white space/line breaks).

##### `Dice.js error 3: No text nodes found as children of argument node.`
The node passed in as the main argument is a valid element, but it does not have a valid (non-empty) text node as a child.

##### `Dice.js error 4: Argument node is no longer part of the DOM tree.`
The main reason for this error is trying to select a text node that was already processed by Dice and has been removed from the DOM tree.

##### `Dice.js error 5: Argument does not have 'parentNode' property.`
This error is likely because the first argument passed into Dice is either `undefined` or not an HTML node.


### Things to Keep in Mind

Dice wraps each character (except skipped characters) in a `span`, and all of them are wrapped in one outer `span`.  You can style those `span`s however you want, but keep in mind that if you want to apply vertical margins to them, you'll need to use `display: inline` or `display: inline-block`.

If using Dice multiple times on the same page or app, be sure to either specify a different ID prefix or set `id` to `false` to avoid multiple elements with the same ID.

