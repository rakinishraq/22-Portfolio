var interval;
var prevIndex = null;
var off = true;
var selected = false;
var animating = false;

var swoosh_length = 600; // timing

$player = new Audio("music.mp3");
$player.volume = 0.1;
$player.loop = true;
$note = $("#note");
$note.prop("opacity", "0.2");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));	
}

function toggle_music() {
	$player.play();

	vol = $player.volume;
	off = !off;
	$note.animate({opacity: off ? 0.2 : 0.7}, 500, "linear");
	//$player.animate({volume: vol==0.1 ? 0 : 0.1}, 2000, "linear");
	interval = setInterval(function () {fade(off ? 0 : 0.1)}, 200);
}

function fade(target) {
	if (Math.abs(target - vol) < 0.01) {
		vol = target;
		clearInterval(interval);
	}
	else {
		vol += Math.sign(target - vol) * 0.005;
	}
	$player.volume = vol;
}

async function tagclick(n) {
	if (animating) return;
	if (!selected || prevIndex == null) prevIndex = n;

	var tags = $("#tagline");
	tags.children().removeClass();
	tags.children().eq(n).addClass("selected");
	tags.addClass("selected");
	$("#logo").addClass("selected");
	await sleep(300);
	$("#content").addClass("selected");
	selected = true;

	if (n != prevIndex) {
    	await swoosh(n < prevIndex);
    	prevIndex = n;
	}
}

async function reset() {
	if (animating || !selected) return;

	prevIndex = null;
	$("#content").removeClass("selected");
	$("#tagline").children().removeClass();
	$("#tagline").removeClass("selected");
	$("#logo").removeClass("selected");
	selected = false;
	animating = true;
	await sleep(1300); // timing?
	animating = false;
}

async function swoosh(dir_right=true) {
	if (animating) return;

	animating = true;
	var content = $("#content");

	var order = ["left", "right"];
	if (!dir_right) order.reverse();

	var prefix = content.attr("class")+' ';
	content.attr("class", prefix + "animate "+order.pop());
	await sleep(swoosh_length);
	content.attr("class", prefix + order.pop());
	await sleep(100);
	content.attr("class", prefix + "animate reset");
	animating = false;
	await sleep(swoosh_length);
	content.attr("class", prefix);
	await sleep(swoosh_length);
}