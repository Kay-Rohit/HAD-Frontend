package com.example.had.response;

public class PlotWeekScore {
    private String name;
    private int weekNumber;
    private float score;

    public String getName() {
        return name;
    }

    public int getWeekNumber() {
        return weekNumber;
    }

    public float getScore() {
        return score;
    }

    public PlotWeekScore(String name, int weekNumber, float score) {
        this.name = name;
        this.weekNumber = weekNumber;
        this.score = score;
    }
}
