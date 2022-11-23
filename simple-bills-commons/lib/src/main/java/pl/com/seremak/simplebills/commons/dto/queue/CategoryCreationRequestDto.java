package pl.com.seremak.simplebills.commons.dto.queue;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.com.seremak.simplebills.commons.model.Category;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryCreationRequestDto implements Serializable {
    private String username;
    private String categoryName;
    private Category.TransactionType transactionType;
    private BigDecimal limit;
}
