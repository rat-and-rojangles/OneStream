var PlayControls = function (jqPausePlay, jqForward, jqBackward, jqSlider) {
	var self = this;
	jqPausePlay.on('click', function () {
		self.onPausePlayPressed();
	});
	jqForward.on('click', function () {
		self.onForwardPressed();
	});
	jqBackward.on('click', function () {
		self.onBackwardPressed();
	});

	var customSlider = new CustomSlider(jqSlider, this);

	this.onPausePlayPressed = function () {
		player.togglePlayback();
	}
	this.onForwardPressed = function () {
		player.skipForward();
	}
	this.onBackwardPressed = function () {
		player.skipBackward();
	}
	this.onSliderRelease = function () {
		player.seekTo(customSlider.getSliderValue());
	}
	this.updateSliderWhilePlaying = function () {
		customSlider.updateValue();
	}

	var enabled = false;
	this.setEnabled = function (state) {
		if (state != enabled) {
			setEnabledHelper(state);
			enabled = state;
		}
	}
	var setEnabledHelper = function (state) {
		jqPausePlay.prop("disabled", !state);
		jqForward.prop("disabled", !state);
		jqBackward.prop("disabled", !state);
		customSlider.setEnabled(state);
	}
	this.getEnabled = function () {
		return enabled;
	}
}

var CustomSlider = function (jqSlider, controller) {
	var held = false;
	var self = this;

	jqSlider.on('mousedown', function () {
		held = self.getEnabled();
	});
	jqSlider.on('mouseup', function () {
		held = false;
		if (self.getEnabled()) {
			controller.onSliderRelease();
		}
	});

	this.getHeld = function () {
		return held;
	}
	this.getSliderValue = function () {
		return parseFloat(jqSlider.val());
	}
	this.setEnabled = function (state) {
		if (!state) {
			held = false;
			jqSlider.val(0);
		}
		jqSlider.prop("disabled", !state);
	}
	this.getEnabled = function () {
		return !jqSlider.prop("disabled");
	}
	this.updateValue = function () {
		if (!held) {
			jqSlider.val(player.getRatio());
		}
	}
}