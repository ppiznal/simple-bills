package pl.com.seremak.simplebills.commons.dto.http;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;
import pl.com.seremak.simplebills.commons.model.Category;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {

    @Nullable
    @Pattern(regexp = "^\\S+$", message = "Username must contain only non-whitespace characters and cannot be empty")
    private String username;

    @NotBlank(message = "Name of Category cannot be blank")
    private String name;

    @NotNull(message = "Transaction type cannot be null")
    private String transactionType;

    @Nullable
    private Category.Type type;

    @Nullable
    private BigDecimal limit;
}
