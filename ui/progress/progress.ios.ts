﻿import common = require("ui/progress/progress-common");
import dependencyObservable = require("ui/core/dependency-observable");
import proxy = require("ui/core/proxy");

function onValuePropertyChanged(data: dependencyObservable.PropertyChangeData) {
    var progress = <Progress>data.object;
    progress.ios.progress = data.newValue / progress.maxValue;
}

function onMaxValuePropertyChanged(data: dependencyObservable.PropertyChangeData) {
    var progress = <Progress>data.object;
    progress.ios.progress = progress.value / data.newValue;
}

// register the setNativeValue callbacks
(<proxy.PropertyMetadata>common.Progress.valueProperty.metadata).onSetNativeValue = onValuePropertyChanged;
(<proxy.PropertyMetadata>common.Progress.maxValueProperty.metadata).onSetNativeValue = onMaxValuePropertyChanged;

// merge the exports of the common file with the exports of this file
declare var exports;
require("utils/module-merge").merge(common, exports);

export class Progress extends common.Progress {
    private _ios: UIProgressView;

    constructor() {
        super();

        this._ios = new UIProgressView();
    }

    get ios(): UIProgressView {
        return this._ios;
    }
} 