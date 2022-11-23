package pl.com.seremak.simplebills.commons.dto.http;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;
import pl.com.seremak.simplebills.commons.model.Deposit;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DepositDto {

    @NotNull(message = "Deposit name cannot be null")
    private String name;

    @Positive(message = "Deposit value cannot be must be a positive number")
    private BigDecimal value;

    @NotNull(message = "Deposit name cannot be null")
    private Deposit.DepositType depositType;

    @Nullable
    private String bankName;

    @Nullable
    private Integer durationInMonths;

    @Builder.Default
    private BigDecimal annualInterestRate = BigDecimal.ZERO;
}
