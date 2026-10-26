package com.blackbeltbot.item;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ItemRequest(
        @NotBlank @Size(max = 200) String title,
        @NotBlank @Size(max = 4000) String body
) {
}
