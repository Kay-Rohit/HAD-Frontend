package com.example.had.response;

import java.util.UUID;

public class Usage
{
    private UUID id;
    String usageTime;
    int count;

    public Usage(UUID id, String usageTime, int count) {
        this.id = id;
        this.usageTime = usageTime;
        this.count = count;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsageTime() {
        return usageTime;
    }

    public void setUsageTime(String usageTime) {
        this.usageTime = usageTime;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
