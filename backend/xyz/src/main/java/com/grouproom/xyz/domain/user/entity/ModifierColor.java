package com.grouproom.xyz.domain.user.entity;

public enum ModifierColor {
    RED("red"),
    GREEN("green"),
    BLUE("blue");

    private final String label;

    ModifierColor(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
