package pl.com.seremak.simplebills.commons.dto.http;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor(staticName = "of")
public class TransactionDto {
    
    private Integer transactionNumber;

    @NotNull(message = "Transaction type cannot be null")
    private String type;

    @Nullable
    private LocalDate date;

    @NotBlank(message = "Description cannot be blank")
    private String description;

    @NotBlank(message = "Category cannot be blank")
    private String category;

    @NotNull(message = "Amount cannot be null")
    @Positive(message = "Amount cannot be negative")
    private BigDecimal amount;

}
