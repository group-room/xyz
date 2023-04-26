package com.grouproom.xyz.domain.user.entity;

public enum ModifierGrade {
    BRONZE("red"),
    SILVER("silver"),
    GOLD("gold");

    private final String label;

    ModifierGrade(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
